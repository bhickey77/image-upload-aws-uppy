import React, { Component } from 'react';
import { sendFileToServer } from '../../requests/sendFormToServer';

class RawInputField extends Component {
  triggerFileSend = event => {
    const file = event.target.files[0];
    sendFileToServer(file);
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.triggerFileSend}/>
      </div>
    );
  }
}
export default RawInputField;
