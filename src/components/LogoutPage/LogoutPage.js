import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../redux/actions/loginActions';
import Button from '@material-ui/core/Button';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LogoutPage extends Component {

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }
  
  render() {
    return (
      <div>
        <Button onClick={this.logout}>Logout</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LogoutPage);
