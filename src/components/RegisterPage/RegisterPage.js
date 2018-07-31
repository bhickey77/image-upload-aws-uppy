import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      organization_name: '',
      supplier_location: '',
      date_created: '',
      date_updated: '',
      supplier_type: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
        organization_name: this.state.organization_name,
        supplier_location: this.state.supplier_location,
        date_created: this.state.date_created,
        date_updated: this.state.date_updated,
        supplier_type: this.state.supplier_type
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  grabDate = ( event ) => {
    let today = new Date().toJSON().toString();
    this.setState({
      date_created: today,
      date_updated: today
    });
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        { JSON.stringify( this.state ) }
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="organization_name">
              Organization Name:
              <input
                type="text"
                name="organization name"
                value={this.state.organization_name}
                onChange={this.handleInputChangeFor('organization_name')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="supplier_location">
              Zip Code:
              <input
                type="text"
                name="supplier location"
                value={this.state.supplier_location}
                onChange={this.handleInputChangeFor('supplier_location')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="supplier_type">
              What do you supply?:
              <input
                type="text"
                name="supplier type"
                value={this.state.supplier_type}
                onChange={this.handleInputChangeFor('supplier_type')}
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Register"
              onClick={ this.grabDate }
            />
            <Link to="/home">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;

