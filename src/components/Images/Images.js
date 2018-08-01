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
        {JSON.stringify(this.state.images)}
      </div>
    );
  }
}
export default Images;
