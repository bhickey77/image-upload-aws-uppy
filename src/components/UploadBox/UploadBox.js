import React, { Component } from 'react';
import axios from 'axios';

import Uppy from '@uppy/core';
import DragDrop from '@uppy/react/lib/DragDrop';


class UploadBox extends Component {
  constructor(props){
    super(props);
    
  }
  
  render() {
  

    return (
      <div>
       
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

export default UploadBox;
