import React, { Component } from 'react';

// MATERIAL UI
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class UploadStage1 extends Component {
  render() {
    return (
      <div>
        <DialogTitle id="form-dialog-title">Are you sure this is the image you would like to upload?</DialogTitle>
        <DialogContent>
          <img className="upload-image" src={this.props.imageDataUrl} alt="post" />          
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleCancel} color="primary">
            No, cancel Post Creation
          </Button>
          <Button onClick={this.props.handleConfirmImage} color="primary">
            Yes, confirm image
          </Button>
        </DialogActions>
      </div>
    );
  }
}
export default UploadStage1;
