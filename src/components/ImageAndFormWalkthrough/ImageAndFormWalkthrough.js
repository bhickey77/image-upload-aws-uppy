import React, { Component } from 'react';

import UploadWalkthrough from '../UploadWalkthrough/UploadWalkthrough';

class ImageAndFormWalkthrough extends Component {
  constructor(props){
    super(props);
    this.state = {
      file: '',
      imageDataUrl: '',
      walkthroughOpen: false,
    }
  }
  
  uppy = Uppy({
    meta: { type: 'profilePicture' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })

  reader = new FileReader();

  componentDidMount = () => {
    //UPPY
    this.uppy.on('upload', file => {
      let fileKey = Object.keys(this.uppy.state.files)[0];
      let fileFromUppy = this.uppy.state.files[fileKey].data;
      setImage(fileFromUppy);
    })

    //FILEREADER
    reader.onloadend = () => {
      this.setState({
        ...this.state,
        imageDataUrl: this.reader.result,
      })
    }
  }

  setImage = file => {
    //reads the file into a local data url
    this.reader.readAsDataURL(file);

    //sets the file into state and opens the walkthrough
    this.setState({
      ...this.state,
      walkthroughOpen: true,
      file: file,
    })
  }


  render() {
    return (
      <div>
        <DragDrop uppy={this.uppy} />
        <UploadWalkthrough 
          open={this.state.walkthroughOpen}
          imageDataUrl={this.state.imageDataUrl}
          file={this.state.file}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default ImageAndFormWalkthrough;
