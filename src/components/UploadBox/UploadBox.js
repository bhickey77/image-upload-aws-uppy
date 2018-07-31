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

import Uppy from '@uppy/core';
// import Tus from '@uppy/tus';
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
    
    // this.uppy.use(Tus, { endpoint: '/api/image/profilepicture' })
    this.uppy.on('upload', file => {
      let fileKey = Object.keys(this.uppy.state.files)[0];
      let imageData = this.uppy.state.files[fileKey].data;
      this.props.setImage(imageData);
    })

    // this.uppy.on('complete', (result) => {
      // const url = result.successful[0].uploadURL
      // console.log(result);
      
      // store.dispatch({
      //   type: SET_USER_AVATAR_URL,
      //   payload: { url: url }
      // })
    // })

    return (
      <div>
        {/* <img src={currentAvatar} alt="Current Avatar" /> */}
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
