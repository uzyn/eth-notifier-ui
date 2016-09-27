/* global WPDEF */
import React from 'react';
import MessageCrafter from './MessageCrafter';

export default function App() {
  let testnetMsg = '';
  let etherscanURL = `https://etherscan.io/address/${WPDEF.CONTRACT_ADDRESS}`;
  if (WPDEF.TESTNET) {
    testnetMsg = <h4>Currently running on Ethereum Morden testnet</h4>;
    etherscanURL = `https://testnet.etherscan.io/address/${WPDEF.CONTRACT_ADDRESS}`;
  }

  return (
    <div className="app Notifier row">
      <section className="intro-panel col-md-5">
        <img src="./img/eth-notifier-logo.svg" alt="eth-notifier" className="logo" />
        <h1>ETH Notifier</h1>

        <h2>Sends notifications from Ethereum</h2>

        {testnetMsg}

        <p className="hidden-xs hidden-sm">&nbsp;</p>
        <p>&nbsp;</p>

        <p>Contract address: <strong><a href={etherscanURL} target="_blank">
          {WPDEF.CONTRACT_ADDRESS}</a></strong>
        </p>

        <p className="adopt">
          Supports <strong>IPFS-augmented calls</strong> for lower gas consumption and enhanced privacy.
        </p>
      </section>

      <section className="main-panel col-md-7">
        <a name="crafter"></a>
        <h2>Craft your message</h2>
        <MessageCrafter />

        <hr />

        <h2>How?</h2>

        <ol>
        <li>Watch ETH Notifier's contract address with the following Application Binary Interface (ABI) from your favorite Ethereum wallet or browser: <br />
          <textarea name="Notifier.abi" readOnly value={JSON.stringify('TODO')} />
        </li>

        <li>
          <p>Call <code>notify(transport, destination, message)</code> with ETH 0.03 <span className="small">(Unspent ETH will be refunded)</span></p>

          <table className="table table-striped table-bordered table-params">
          <tbody>
          <tr>
            <td><code>transport</code></td>
            <td><code>1</code> for SMS. Email coming soon.</td>
          </tr>
          <tr>
            <td><code>destination</code></td>
            <td>Phone number in E.164 beginning with <code>+</code>.</td>
          </tr>
          <tr>
            <td><code>message</code></td>
            <td>Message in UTF-8.</td>
          </tr>
          </tbody>
          </table>

          <p>Or, <code>xnotify(ipfs_hash)</code> for IPFS-augmented call, with the content containing JSON-representation of the parameters in order.<br /> See also <strong>encrypted</strong> IPFS-augmented call.</p>
        </li>

        <li>
          Done! You should be receiving an SMS seconds after your transaction is mined and confirmed.<br />
          Check your account balance with various balance functions (see ABI) and withdraw to your wallet with <code>withdraw()</code>.
        </li>

        </ol>

        <hr />

        <h2>Encryption</h2>

        <p>If you do not wish to divulge the content of your message on Ethereum blockchain, you may encrypt your message using encrypted IPFS-augmented call.</p>

        <p><em>Details coming soon&hellip;</em> <br />Use the <a href="#crafter">message crafter</a> for the time being.</p>
      </section>
    </div>
  );
}
