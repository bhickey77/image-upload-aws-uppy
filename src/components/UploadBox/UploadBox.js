import React, { Component } from 'react';
import axios from 'axios';

import Uppy from '@uppy/core';
import DragDrop from '@uppy/react/lib/DragDrop';


class UploadBox extends Component {
  constructor(props){
    super(props);
    
  }
  
  render() {
    this.uppy = Uppy({
      meta: { type: 'profilePicture' },
      restrictions: { maxNumberOfFiles: 1 },
      autoProceed: true
    })
    
    this.uppy.on('upload', file => {
      let fileKey = Object.keys(this.uppy.state.files)[0];
      let imageData = this.uppy.state.files[fileKey].data;
      this.props.setImage(imageData);
    })


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
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

export default UploadBox;
