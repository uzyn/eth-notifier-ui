const Web3 = require('web3');
const config = require('config');

const web3 = new Web3(new Web3.providers.HttpProvider(config.get('server.web3Provider')));
const Notifier = web3.eth.contract(JSON.parse(config.get('contract.abi'))).at(config.get('contract.address'));

module.exports = { web3, Notifier };
