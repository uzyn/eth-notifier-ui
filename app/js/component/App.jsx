import React from 'react';

export default function App() {
  return (
    <div className="app Notifier row">
      <section className="intro-panel col-md-5">
        <img src="./img/eth-notifier-logo.svg" alt="eth-notifier" className="logo" />
        <h1>ETH Notifier</h1>

        <h2>Sends SMS from Ethereum</h2>

        <h4>Currently running on Ethereum Morden testnet</h4>

        <p className="hidden-xs hidden-sm">&nbsp;</p>
        <p>&nbsp;</p>

        <p>Contract address: <strong><a href={`https://testnet.etherscan.io/address/${process.env.CONTRACT_ADDRESS}`} target="_blank">{process.env.CONTRACT_ADDRESS}</a></strong></p>

        <p className="adopt">
          Adopts <a href="https://github.com/uzyn/ethereum-service-standard" target="_blank"><strong>Ethereum Service Standard</strong></a> (v0.1 Draft)
        </p>
      </section>
    </div>
  );
}
