import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import LogoutPage from '../LogoutPage/LogoutPage';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';

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

//AWS
const AWS = require('aws-sdk');
const BUCKET_NAME = 'local-crate-social-platform';
const IAM_USER_KEY = process.env.aws_access_key_id;
const IAM_USER_SECRET = process.env.aws_secret_access_key;

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class UploadFile extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      profilePictureUrl: '',
      imageData: '', 
      currentUploadStage: 1,
      postTitle: '',
      postContent: '',
    };
  }

  handlePostCancel = () => {
    this.setState({ 
      ...this.state,
      open: false,
     });
  };

  handleConfirmImage = () => {
    this.setState({ 
      ...this.state,
      currentUploadStage: 2,
     });
  };

  handleChangeFor = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value,
    })
    console.log(this.state);
  }

  handleSubmitPost = () => {
    this.sendPost();
    this.setState({
      open: false,
      profilePictureUrl: '',
      imageData: '',
      currentUploadStage: 1,
    })
  }

  backToImageUpload = () => {
    this.setState({
      ...this.state,
      currentUploadStage: 1,
    })
  }

  handleClickOpen = () => {
    this.setState({
      ...this.state,
      open: true,
    })
  }

  setImage = (imageData) => {
    console.log(`SETTING IMAGE: `, imageData);
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      this.setState({
        ...this.state,
        profilePictureUrl: reader.result,
      })
    }
    reader.readAsDataURL(imageData);
    this.setState({
      ...this.state,
      open: true,
      imageData: imageData,
    })
  }

 

  sendPost = () => {
    const data = new FormData();
    data.append('title', this.state.postTitle);
    data.append('content', this.state.postContent);
    data.append('userName', this.props.user.userName);
    data.append('file', this.state.imageData);
    axios.post('api/post', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': this.state.imageData.type,
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
        <UploadBox setImage={this.setImage} />

        {/* <input type="file" name="image" onChange={this.handleUploadFile} /> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        {
          this.state.currentUploadStage === 1 &&
            <UploadStage1 
              profilePictureUrl={this.state.profilePictureUrl} 
              handlePostCancel = {this.handlePostCancel}
              handleConfirmImage = {this.handleConfirmImage}
            />
        }
        {
          this.state.currentUploadStage === 2 &&
            <UploadStage2 
              profilePictureUrl={this.state.profilePictureUrl} 
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
export default connect(mapStateToProps)(UploadFile);
