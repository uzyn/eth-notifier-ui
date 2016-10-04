import React from 'react';

const propTypes = {
  helperApiUrl: React.PropTypes.string.isRequired,
};

class MessageCrafter extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      transport: 1,
      destination: '',
      message: '',
      method: 'standard',
      showSendButton: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    switch (this.state.method) {
      case 'xipfs-plain':
      case 'xipfs-encrypted': {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${this.props.helperApiUrl}/craft`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
          if (xhr.status === 200) {
            console.log(xhr.responseText);
            // console.log(JSON.parse(xhr.responseText);
          }
        };
        xhr.send(JSON.stringify({
          destination: this.state.destination.trim(),
          message: this.state.message.trim(),
          method: this.state.method,
        }));
        break;
      }
      default: {
        console.log('none');
      }
    }
  }

  handleChange(event) {
    // Only support phone for the time being, automatically prepend '+'
    let value = event.target.value;
    if (event.target.name === 'destination') {
      if (value.length > 0 && value.substring(0, 1) !== '+') {
        value = `+${value}`;
      }
    }

    this.setState({ [event.target.name]: value });
  }

  showIPFSButton() {
    if (this.state.method !== 'xipfs-plain' && this.state.method !== 'xipfs-encrypted') {
      return '';
    }
    return (
      <div>
        <button type="submit" className="btn btn-default btn-lg" onClick={this.handleSubmit}>Get IPFS Hash</button>
        <span className="after-button">
          <span className="error">osidjofi</span>
          <span className="success">sdfkpsodkfpoksf</span>
        </span>
      </div>
    );
  }

  showResult() {
    if (!this.state.destination || !this.state.message) {
      return '';
    }

    if (this.state.method === 'standard') {
      return (
        <div className="well result">
          To send your message, call
          <code>notify()</code>
          with the following parameters:
          <table className="table table-striped table-bordered table-params">
            <tbody>
            <tr>
              <td><code>transport</code></td>
              <td>{this.state.transport}</td>
            </tr>
            <tr>
              <td><code>destination</code></td>
              <td>{this.state.destination}</td>
            </tr>
            <tr>
              <td><code>message</code></td>
              <td>{this.state.message}</td>
            </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="message-crafter">
        <p className="">Enter a phone number and message to get started.</p>
        <form className="form">
          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input type="text" className="form-control" id="destination" name="destination" placeholder="e.g.: +15417543010" value={this.state.destination} onChange={this.handleChange} />
            <p className="help-block">Phone number in E.164 format starting with + and country code.</p>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <input type="message" className="form-control" id="message" name="message" placeholder="Hello..." value={this.state.message} onChange={this.handleChange} />
          </div>

          <p><strong>Via</strong></p>
          <div className="radio">
            <label>
              <input type="radio" name="method" id="methodStandard" value="standard" checked={this.state.method === 'standard'} onChange={this.handleChange} />
              Standard Ethereum call<br />
              <small className="radio-explanation">Parameters are publicly visible on blockchain.</small>
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="method" id="methodxIPFSPlain" value="xipfs-plain" checked={this.state.method === 'xipfs-plain'} onChange={this.handleChange} />
              IPFS-augmented plaintext call<br />
              <small className="radio-explanation">Lower gas, data remains publicly viewable.</small>
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="method" id="methodxIPFSEncrypted" value="xipfs-encrypted" checked={this.state.method === 'xipfs-encrypted'} onChange={this.handleChange} />
              IPFS-augmented call with encryption<br />
              <small className="radio-explanation">Lower gas, data is encrypted.</small>
            </label>
          </div>

          {this.showIPFSButton()}
        </form>

        {this.showResult()}
        <p>* Mist and MetaMask support coming soon.</p>
      </div>
    );
  }
}

MessageCrafter.propTypes = propTypes;

export default MessageCrafter;
