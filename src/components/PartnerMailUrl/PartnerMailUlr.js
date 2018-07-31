import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => ({
  user: state.user,
});

class PartnerMailUrl extends Component {
  constructor(props){
    super(props);
    this.state = {
      partner: {
        name: '',
        location: '',
      },
      person: {
        username: '',
        first_name: '',
        last_name: '',
      }

    }
  }

  render() {
    return (
      <div>
        <div className="registration-container">
          <Paper>
            <div className="registration-inputs-container">
              <TextField
                id="name"
                label="Name"
                value={this.state.name}
                // onChange={this.handleChange('name')}
                margin="normal"
              />
              <br/>
              <TextField
                id="uncontrolled"
                label="Uncontrolled"
                defaultValue="foo"
                margin="normal"
              />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PartnerMailUrl);
