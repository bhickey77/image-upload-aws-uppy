import React, { Component } from 'react';

// MATERIAL UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class UploadStage1 extends Component {
  render() {
    return (
      <div>
        <DialogTitle id="form-dialog-title">Are you sure this is the image you would like to upload?</DialogTitle>
        <DialogContent>
          <img className="uploadImage" src={this.props.profilePictureUrl} alt="profilePictureUrl" />          
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handlePostCancel} color="primary">
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
