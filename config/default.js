/**
 * Override any of the following values at config/local.js
 *
 * or as other files named at
 * https://github.com/lorenwest/node-config/wiki/Configuration-Files
 */
module.exports = {

  testnet: true,
  helperApiUrl: 'http://localhost:4000',
  contract: {
    address: '0x4e2822607180a09a6eea85d3b98041a65135151b',
    abi: '[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"owners","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_account","type":"address"},{"name":"_amount","type":"uint256"}],"name":"returnFund","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_candidate","type":"address"}],"name":"removeOwner","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_publicKey","type":"string"}],"name":"updateXIPFSPublicKey","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"collectRev","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_candidate","type":"address"}],"name":"addManager","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint256"},{"name":"_cost","type":"uint256"}],"name":"taskProcessedWithCosting","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"txCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"minEthPerNotification","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_txid","type":"uint256"}],"name":"checkTimeout","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"managersCount","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"string"}],"name":"xnotify","outputs":[{"name":"txid","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_candidate","type":"address"}],"name":"addOwner","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tasks","outputs":[{"name":"xipfs","type":"string"},{"name":"transport","type":"uint8"},{"name":"destination","type":"string"},{"name":"message","type":"string"},{"name":"sender","type":"address"},{"name":"txid","type":"uint256"},{"name":"state","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint256"}],"name":"taskProcessedNoCosting","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint256"},{"name":"_cost","type":"uint256"}],"name":"taskRejected","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"availableBalance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_candidate","type":"address"}],"name":"removeManager","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"ownersCount","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"tasksCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"onholdBalances","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"spentBalance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"availableBalances","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"xIPFSPublicKey","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"accountTxs","outputs":[{"name":"txid","type":"uint256"},{"name":"timeCreated","type":"uint256"},{"name":"timeSettled","type":"uint256"},{"name":"timeoutPeriod","type":"uint256"},{"name":"user","type":"address"},{"name":"amountHeld","type":"uint256"},{"name":"amountSpent","type":"uint256"},{"name":"state","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"_newMin","type":"uint256"}],"name":"updateMinEthPerNotification","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"onholdBalance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_transport","type":"uint8"},{"name":"_destination","type":"string"},{"name":"_message","type":"string"}],"name":"notify","outputs":[{"name":"txid","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"managers","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[{"name":"_xIPFSPublicKey","type":"string"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"taskId","type":"uint256"},{"indexed":false,"name":"state","type":"uint8"},{"indexed":false,"name":"transport","type":"uint8"}],"name":"TaskUpdated","type":"event"}]',
  },

  /**
   * For server-side companion
   */
  server: {
    ipfsNode: '/ip4/127.0.0.1/tcp/5001',
    web3Provider: 'http://localhost:8545',

    /**
     * Helper web server
     */
    port: 4000,
  },
};
