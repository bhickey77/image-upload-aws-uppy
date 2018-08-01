import React, { Component } from 'react';

// MATERIAL UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UploadBox from '../UploadBox/UploadBox';

//UPLOAD STAGES
import UploadStage1 from '../UploadStage1/UploadStage1';
import UploadStage2 from '../UploadStage2/UploadStage2';

import { sendFileAndTextToServer } from '../../requests/sendFormToServer';

//AWS
const AWS = require('aws-sdk');
const BUCKET_NAME = process.env.bucket_name;
const IAM_USER_KEY = process.env.aws_access_key_id;
const IAM_USER_SECRET = process.env.aws_secret_access_key;

class UploadWalkthrough extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: '',
      currentUploadStage: 1,
      title: '',
      content: '',
    };
  }

  componentWillReceiveProps = () => {
    this.setState({
      ...this.state,
      open: this.props.open,
    })
  }

  //Dilaog box actions
  handleConfirmImage = () => {
    this.setState({ 
      ...this.state,
      currentUploadStage: 2,
     });
  };

  backToImageUpload = () => {
    this.setState({
      ...this.state,
      currentUploadStage: 1,
    })
  }

  handleCancel = () => {
    this.setState({ 
      ...this.state,
      open: false,
     });
  };

  handleClickOpen = () => {
    this.setState({
      ...this.state,
      open: true,
    })
  }

  handleChangeFor = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value,
    })
  }


  //submission
  handleSubmitPost = () => {
    this.triggerSend();
    this.setState({
      open: false,
      profilePictureUrl: '',
      imageData: '',
      currentUploadStage: 1,
    })
  }

  triggerSend = () => {
    const file = this.props.file;
    const text = {
      title: this.state.title,
      content: this.state.content,
    }
    sendFileAndTextToServer(file, text)
  }


  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleCancel}
          aria-labelledby="form-dialog-title"
        >
          {
            this.state.currentUploadStage === 1 &&
              <UploadStage1 
                imageDataUrl={this.props.imageDataUrl} 
                handleCancel = {this.props.handleCancel}
                handleConfirmImage = {this.handleConfirmImage}
              />
          }
          {
            this.state.currentUploadStage === 2 &&
              <UploadStage2 
                imageDataUrl={this.props.imageDataUrl} 
                backToImageUpload = {this.backToImageUpload}
                handleSubmitPost = {this.handleSubmitPost}
                handleChangeFor = {this.handleChangeFor}
              />
          }
        </Dialog>
      </div>
    );
  }
}
export default UploadWalkthrough;
