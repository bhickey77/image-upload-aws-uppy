import React, { Component } from 'react';
import axios from 'axios';

//AWS
const AWS = require('aws-sdk');
const BUCKET_NAME = process.env.bucket_name;
const IAM_USER_KEY = process.env.aws_access_key_id;
const IAM_USER_SECRET = process.env.aws_secret_access_key;

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class RawInputField extends Component {
  uploadFile = event => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('file', file);
    axios.post('api/image', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': file.type,
      }})
      .then(response => {
        console.log('successfully uploaded to the S3: ', response); // do something with the response
      })
      .catch(error => {
        console.log('error uploading file: ', error);
      })
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.uploadFile}/>
      </div>
    );
  }
}
export default RawInputField;
