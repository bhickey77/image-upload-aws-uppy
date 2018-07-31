import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../../redux/actions/loginActions';

// Components
import AdminNav from '../AdminNav/AdminNav';
// Material UI

const mapStateToProps = state => ({
  user: state.user,
  partners: state.partner.partners
});

class AdminPartnerAccounts extends Component {

  componentDidMount() {
      this.props.dispatch(clearError());
      this.props.dispatch({ type: 'FETCH_PARTNERS' })
  }

  render() {
    let content = null;
    

    content = (
    <div>
        <p>Admin Partner Accounts</p>
        <p>This will be where the admin can view a list of partner profiles</p>
    </div>
    );
    

    return (
      <div>
          <AdminNav/>
        { content }
        {this.props.partners.map( partner =>
          {return JSON.stringify(partner) })}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminPartnerAccounts);