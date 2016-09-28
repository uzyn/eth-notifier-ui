const { Notifier } = require('./component/Notifier');
const xipfs = require('./component/xipfs');
const config = require('config');
const app = require('express')();

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
  /*
  client.notify(null, null, null, null, null, { xipfs: false }).then(txid =>
    res.send(`[Plain] Notification sent\ntx: ${txid}`)
  )
  */
 console.log(req);
});

const server = app.listen(config.get('server.port'), () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`IPFS helper server for eth-notifier-ui is now listening at http://${host}:${port}`);
});
