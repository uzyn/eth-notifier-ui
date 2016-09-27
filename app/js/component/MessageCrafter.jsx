import React from 'react';

export default function MessageCrafter() {
  return (
    <form className="form">
      <div className="form-group">
        <label htmlFor="phone">Phone number</label>
        <input type="text" className="form-control" id="phone" placeholder="+15417543010" />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <input type="message" className="form-control" id="message" placeholder="Hello..." />
      </div>

      <p><strong>Via</strong></p>
      <div className="radio">
        <label>
          <input type="radio" name="method" id="methodStandard" value="standard" defaultChecked />
          Standard Ethereum call<br />
          <small className="radio-explanation">Parameters are publicly visible on blockchain.</small>
        </label>
      </div>
      <div className="radio">
        <label>
          <input type="radio" name="method" id="methodxIPFSPlain" value="xipfs-plain" />
          IPFS-augmented plaintext call<br />
          <small className="radio-explanation">Cheaper gas, data is still publicly viewable.</small>
        </label>
      </div>
      <div className="radio">
        <label>
          <input type="radio" name="method" id="methodxIPFSEncrypted" value="xipfs-encrypted" />
          IPFS-augmented call with encryption<br />
          <small className="radio-explanation">Cheaper gas, data is encrypted.</small>
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-lg">Send notification</button>
    </form>
  );
}
