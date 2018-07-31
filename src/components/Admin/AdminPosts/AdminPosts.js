import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../../redux/actions/loginActions';

// Components
import AdminNav from '../AdminNav/AdminNav';
// Material UI

const mapStateToProps = state => ({
  user: state.user,
  posts: state.post.posts
});

class AdminPosts extends Component {

  componentDidMount() {
      this.props.dispatch(clearError());
      this.props.dispatch({ type: 'FETCH_POSTS' });
  }

  render() {
    let content = null;
    

    content = (
    <div>
        <p>Admin Partner Posts</p>
        <p>This will be where the admin can view a list of partner posts</p>
    </div>
    );
    

    return (
      <div>
          <AdminNav/>
        { content }
        {this.props.posts.map( post =>
          {return JSON.stringify(post) })}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminPosts);