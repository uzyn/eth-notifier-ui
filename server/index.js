const { Notifier } = require('./component/Notifier');
const xipfs = require('./component/xipfs');
const config = require('config');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('X-Powered-By', 'eth-notifier-ui helper');
  next();
});

app.get('/', (req, res) =>
  res.send(`Available endpoints:
    /craft/plain - Pushes message content, unencrypted, to IPFS
    /craft/encrypted - Pushes message content, encrypted, to IPFS
  `)
);

app.post('/craft', (req, res) => {
  console.log(req.body);
  if (!req.body.destination || !req.body.message || !req.body.method) {
    return res.status(500).send({ error: 'method, destination and message expected in JSON body.' });
  }

  if (req.body.method !== 'xipfs-plain' && req.body.method !== 'xipfs-encrypted') {
    return res.status(500).send({ error: 'only xipfs-plain and xipfs-encrypted are supported.' });
  }

  const transport = 1; // SMS
  const callParams = [
    transport,
    req.body.destination,
    req.body.message,
  ];
  let ipfsData = callParams;

  if (req.body.method === 'xipfs-encrypted') {
    console.log('encrypted - TODO');
  }

  return xipfs.push(ipfsData).then(data =>
    res.send({ ipfsHash: data[0].hash })
  , err =>
    res.status(500).send({ error: err })
  );

  // return res.send({hey: 'you'});
});

const server = app.listen(config.get('server.port'), () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`IPFS helper server for eth-notifier-ui is now listening at http://${host}:${port}`);
});
