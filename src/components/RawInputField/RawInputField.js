import React, { Component } from 'react';
import { sendFileToServer } from '../../requests/sendFormToServer';

//AWS
const AWS = require('aws-sdk');
const BUCKET_NAME = process.env.bucket_name;
const IAM_USER_KEY = process.env.aws_access_key_id;
const IAM_USER_SECRET = process.env.aws_secret_access_key;

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
