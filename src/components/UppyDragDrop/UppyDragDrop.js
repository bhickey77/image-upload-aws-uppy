import React, { Component } from 'react';
import { sendFileToServer } from '../../requests/sendFormToServer';

//UPPY
import Uppy from '@uppy/core';
import DragDrop from '@uppy/react/lib/DragDrop';
// If you check out @uppy/react/lib/ in your node modules you will see the library
// other Uppy components that could be used as an alternative. Other components
// might require a different approach than outlined here.

class UppyDragDrop extends Component {
  uppy = Uppy({
    meta: { type: 'profilePicture' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })
    .on('upload', file => {
      let fileKey = Object.keys(this.uppy.state.files)[0];
      let fileFromUppy = this.uppy.state.files[fileKey].data;
      console.log(`uploading`);
    
      sendFileToServer(fileFromUppy);
    })

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
