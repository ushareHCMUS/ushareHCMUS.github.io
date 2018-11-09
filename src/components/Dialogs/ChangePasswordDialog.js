import React, { Component } from 'react';
import {
  Dialog,
  FlatButton
} from 'material-ui';
import { connect } from 'react-redux';
import PasswordTextField from './PasswordTextField';
import Auth from '../../utils/Auth';
import { red600 } from 'material-ui/styles/colors';

class ChangePasswordDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPass: '',
      newPassError: '',
      reenterPass: '',
      reenterPassError: '',
    } 
  }

  componentWillReceiveProps() {
    this.setState({
      newPassError: '',
      reenterPassError: '',
    })
  }

  changePasswordHandler = () => {
    this.setState({
      newPassError: '',
      reenterPassError: '',
    })
    if (this.state.newPass !== '' && this.state.reenterPass !== '') {
      const data = {
        'email': Auth.email(),
        'new-password': this.state.newPass,
      }
      if (this.state.newPass !== this.state.reenterPass) {
        this.setState({ reenterPassError: 'Password not match' });
      }
      else {
        this.props.handleClose();
        this.props.changePassword(data);
      }
    }
    if (this.state.newPass === '')
      this.setState({ newPassError: `Password can't be empty` });
    if (this.state.reenterPass === '')
      this.setState({ reenterPassError: `Password can't be empty` });
  }

  textChangeHandler = (e) => {
    switch (e.currentTarget.name) {
      case 'New Password':
        this.setState({ newPass: e.currentTarget.value })
        break;
      case 'Reenter Password':
        this.setState({ reenterPass: e.currentTarget.value })
        break;
      default:
        break;
    }
  }

  keyDownHandler = (e) => {
    //if is ENTER key
    if(e.keyCode == 13) {
      this.changePasswordHandler();
    }
  }

  render() {
    return (
      <Dialog
        title={'Change password'}
        actions={
          [<FlatButton 
            label={'Cancel'} 
            onClick={this.props.handleClose} 
            style={{ 
              color:red600,
              minWidth: '100px', 
              margin: '10px 10px 10px 0px', 
              cursor: 'pointer' }}
          />,<FlatButton 
            label={'Change'} 
            onClick={this.changePasswordHandler} 
            style={{ 
              minWidth: '100px', 
              margin: '10px 10px 10px 0px', 
              cursor: 'pointer' }}
          />]
        }
        autoScrollBodyContent={true}
        open={this.props.open}
        contentStyle={{ width: '100%' }}
        onRequestClose={this.props.handleClose}
      >
        <PasswordTextField 
          label={'New Password'} 
          errorText={this.state.newPassError}
          onKeyDown={this.keyDownHandler}
          textChangeHandler={this.textChangeHandler} /> 
        <PasswordTextField 
          label={'Reenter Password'} 
          onKeyDown={this.keyDownHandler}
          errorText={this.state.reenterPassError}
          textChangeHandler={this.textChangeHandler} /> 
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps,mapDispatchToProps)(ChangePasswordDialog);