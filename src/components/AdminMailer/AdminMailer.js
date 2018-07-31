import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// Components
import Nav from '../../components/Nav/Nav';
// Material UI
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

const mapStateToProps = state => ({
  user: state.user,
});

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

class AdminMailer extends Component {
  
  constructor(){
      super();

      this.state = {
            
            name: '',
            email: '',
            open: false,
            Transition: null,
            
      }
  }
  
  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  resetForm() {
    this.setState({
      name: '',
      email: '',
    })
  }
  sendWelcomeEmail = () => {
    this.props.dispatch({type:'SEND_NEW_PARTNER_EMAIL', payload:this.state});
    console.log(this.state);
    this.resetForm();
    this.handleClick(TransitionUp)();
  }

  handleInputChange = (event) => {
    switch(event.target.id){
      case 'name':
        this.setState({name: event.target.value});
        break;
      case 'email':
        this.setState({email: event.target.value});
        break; 
      default:
        console.log('Invalid field');
        break;      
    }
  }

  render() {
    let content = null;
    
    if (this.props.user.userName) {
      content = (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p>
              Send a welcome email to a partner
            </p>
            <Input 
                placeholder="Name" 
                id="name"
                value={this.state.name}
                onChange={this.handleInputChange}
            />
            <br/>
            <Input 
                placeholder="Email Address" 
                id="email"
                value={this.state.email}
                onChange={this.handleInputChange}
            />
            <br/>
            <Button vairant="raised" color="primary" onClick={this.sendWelcomeEmail} >Send Welcome Email</Button>
            <Snackbar
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={this.state.Transition}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Welcome Email Sent!</span>}
              autoHideDuration={3000}
            />
        </div>
      );
    }

    return (
      <div>
        <Nav/>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminMailer);
