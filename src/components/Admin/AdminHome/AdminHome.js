import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../../redux/actions/loginActions';

// Components
import AdminNav from '../AdminNav/AdminNav';
// Material UI

const mapStateToProps = state => ({
  user: state.user,
});

class AdminHome extends Component {

  componentDidMount() {
      this.props.dispatch(clearError());
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.user.userName!=='admin') {
          this.props.history.push('/user');
      }
  }

  render() {
    let content = null;
    

    content = (
    <div>
        <p>Admin Component</p>
        <p>This will be where the admin can view a list of profiles and posts</p>
    </div>
    );
    

    return (
      <div>
          <AdminNav/>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminHome);