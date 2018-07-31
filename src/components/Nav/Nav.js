import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import LogoutPage from '../LogoutPage/LogoutPage';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class Nav extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  render() {
    let content = null;

    content = (
      <div className="navbar">
        <div>
          <ul>
            <li>
              <Link to="/user">
                User Home
              </Link>
            </li>
            <li>
              <Link to="/info">
                Info Page
              </Link>
            </li>
            <li>
              <Link to="/upload">
                Upload
              </Link>
            </li>
            <li>
              <Link to="/adminMailer">
                AdminMailer
              </Link>
            </li>
            <li>
              <Link to="/PartnerMailUrl">
                PartnerMailUrl
              </Link>
            </li>
            {(this.props.user.userName) ?
            <li>
              <LogoutPage/>
            </li> 
            :  
            <li>
              <LoginPage/>
            </li>
            }
          </ul>
        </div>
      </div>
    )
    return (
      <div>
        { content }
      </div>
    );
  }
}
export default connect(mapStateToProps)(Nav);
