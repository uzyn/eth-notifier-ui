import React from 'react';

const propTypes = {
  helperApiUrl: React.PropTypes.string.isRequired,
};

class MessageCrafter extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      destination: '',
      message: '',
      method: 'xipfs-encrypted',
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

  render() {
    return (
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

        <button type="submit" className="btn btn-default btn-lg" onClick={this.handleSubmit}>Send notification</button>
        <span className="after-button">
          <span className="error">osidjofi</span>
          <span className="success">sdfkpsodkfpoksf</span>
        </span>

      </form>
    );
  }
}

MessageCrafter.propTypes = propTypes;

export default MessageCrafter;
