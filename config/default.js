/**
 * Override any of the following values at config/local.js
 *
 * or as other files named at
 * https://github.com/lorenwest/node-config/wiki/Configuration-Files
 */
module.exports = {

  testnet: true,
  contractAddress: '0x4e2822607180a09a6eea85d3b98041a65135151b',

  /**
   * For server-side companion
   */
  server: {
    ipfsnode: '/ip4/127.0.0.1/tcp/5001',
  }
};
