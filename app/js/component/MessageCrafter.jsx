import React from 'react';

const propTypes = {
  helperApiUrl: React.PropTypes.string.isRequired,
};

class MessageCrafter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.phoneInput.value);
    console.log(this.messageInput.value);
    console.log(this.crafterForm.method.value);

    switch (this.crafterForm.method.value) {
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
          destination: this.phoneInput.value.trim(),
          message: this.messageInput.value.trim(),
          method: this.crafterForm.method.value,
        }));
        break;
      }
      default: {
        console.log('none');
      }
    }
  }

  render() {
    return (
      <form className="form" ref={(ref) => { this.crafterForm = ref; }}>
        <div className="form-group">
          <label htmlFor="phone">Phone number</label>
          <input type="text" className="form-control" id="phone" placeholder="+15417543010" ref={(ref) => { this.phoneInput = ref; }} />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <input type="message" className="form-control" id="message" placeholder="Hello..." ref={(ref) => { this.messageInput = ref; }} />
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
            <small className="radio-explanation">Lower gas, data remains publicly viewable.</small>
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="method" id="methodxIPFSEncrypted" value="xipfs-encrypted" />
            IPFS-augmented call with encryption<br />
            <small className="radio-explanation">Lower gas, data is encrypted.</small>
          </label>
        </div>

        <button type="submit" className="btn btn-default btn-lg" onClick={this.handleSubmit}>Send notification</button>
      </form>
    );
  }
}

MessageCrafter.propTypes = propTypes;

export default MessageCrafter;
