import React, { Component } from 'react';
import axios from 'axios';
import { sendFileToServer } from '../../requests/sendFormToServer';

//UPPY
import Uppy from '@uppy/core';
import DragDrop from '@uppy/react/lib/DragDrop';
// If you check out @uppy/react/lib/ in your node modules you will see the library
// other Uppy components that could be used as an alternative. Other components
// might require a different approach than outlined here.

//AWS
const AWS = require('aws-sdk');
const BUCKET_NAME = process.env.bucket_name;
const IAM_USER_KEY = process.env.aws_access_key_id;
const IAM_USER_SECRET = process.env.aws_secret_access_key;


class UppyDragDrop extends Component {
  uppy = Uppy({
    meta: { type: 'profilePicture' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })

  componentDidMount = () => {
    this.uppy.on('upload', file => {
      let fileKey = Object.keys(this.uppy.state.files)[0];
      let fileFromUppy = this.uppy.state.files[fileKey].data;
      console.log(`uploading`);
    
      sendFileToServer(fileFromUppy);
    })
  }

  render() {
    return (
      <div>
        <DragDrop 
          uppy={this.uppy}
          locale={{
            strings: {
              chooseFile: 'Pick a new avatar'
            }
          }}
        />
      </div>
    );
  }
}
export default UppyDragDrop;
