import React, { Component } from 'react';
import axios from 'axios';

class Images extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: [],
    }
  }
  componentDidMount = () => {
    axios.get('api/post')
      .then(response => {
        this.setState({
          images: response.data
        })
      })
      .catch(error => {
        console.log('Error getting images: ', error);
      })
  }

  render() {
    return (
      <div>
        {this.state.images.map((image, index) => {
          return (
            <div key={index} className="post">
              <img className="image" src={image.media_url} alt="post"/>
              {
                (image.title !== null || image.content !== null) &&
                  [<span key='a' className="title">Title: {image.title}  </span>,
                  <span key='b' className="content">  Content: {image.content}</span>]
              }  
            </div>
          )
        })}
      </div>
    );
  }
}
export default Images;
