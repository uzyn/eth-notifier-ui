/**
 * Extended function calls to smart contract via
 * augmented IPFS calls
 * also supports encryption
 */
const config = require('config');
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI(config.get('server.ipfsNode'));
const stream = require('stream');
const fs = require('fs');
const crypto = require('crypto');

/**
 * Get public key from PEM for inserting into contract
 * stripping away endlines and PEM markers
 */
function formatKeyFromPEM(location, _options = {}) {
  const options = Object.assign({
    pre: /-+BEGIN \S*\s?PUBLIC KEY-+/ig,
    post: /-+END \S*\s?PUBLIC KEY-+/ig,
  }, _options);

  let contents;
  try {
    contents = fs.readFileSync(location, 'utf8');
  } catch (e) {
    contents = '';
  }

  let key = contents.replace(/\n|\r/g, '');
  key = key.replace(options.pre, '');
  key = key.replace(options.post, '');

  return key;
}

/**
 * Get PEM from public key obtained from contract
 */
function formatPEMFromKey(contractKey, _options = {}) {
  const options = Object.assign({
    pre: '-----BEGIN PUBLIC KEY-----',
    post: '-----END PUBLIC KEY-----',
  }, _options);

  return `${options.pre}\n${contractKey}\n${options.post}`;
}

/**
 * Pushes payload to IPFS and returns hash asynchronously
 */
function push(_payload, _encryption = {}) {
  let payload = _payload;
  if (typeof payload !== 'string') {
    payload = JSON.stringify(payload);
  }
  const encryption = Object.assign({
    publicKey: '',
    cipher: 'aes-256-cbc',
    symKeyLength: 32,
    ivLength: 16,
  }, _encryption);

  if (encryption.publicKey) {
    const pem = formatPEMFromKey(encryption.publicKey);
    const symmetricKey = crypto.randomBytes(encryption.symKeyLength);
    const iv = crypto.randomBytes(encryption.ivLength);
    const payloadCipher = crypto.createCipheriv(encryption.cipher, symmetricKey, iv);
    let encryptedPayload = payloadCipher.update(payload, 'utf8', 'base64');
    encryptedPayload += payloadCipher.final('base64');

    payload = JSON.stringify({
      data: encryptedPayload,
      key: crypto.publicEncrypt({ key: pem }, symmetricKey).toString('base64'),
      iv: crypto.publicEncrypt({ key: pem }, iv).toString('base64'),
      cipher: encryption.cipher,
    });
  }

  const plStream = new stream.Readable({
    encoding: 'utf8',
  });
  plStream.push(payload);
  plStream.push(null);

  return new Promise((resolve, reject) => {
    ipfs.util.addFromStream(plStream, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

/**
 * Reads from IPFS
 */
function get(hash) {
  return ipfs.get(hash).then(files =>
    new Promise((resolve, reject) => {
      let buf = '';
      files.on('data', file => {
        file.content.on('data', data => {
          buf += data.toString();
        });
        // file.content.on('error', fileErr => reject(fileErr));
        file.content.on('end', () => buf);
      });
      files.on('error', filesErr => reject(filesErr));
      files.on('end', () => {
        try {
          return resolve(JSON.parse(buf));
        } catch (e) {
          return reject(e);
        }
      });
    })
  );
}

module.exports = { push, get, formatKeyFromPEM, formatPEMFromKey };
