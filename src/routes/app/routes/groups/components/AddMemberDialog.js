import React, { Component } from 'react';
import {
  Dialog,
  TextField,
  FlatButton,
  AutoComplete,
} from 'material-ui';
import { red600 } from 'material-ui/styles/colors';

class AddMemberDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameError: '',
      email: '',
      emailError: '',
      newPass: '',
      newPassError: '',
      reenterPass: '',
      reenterPassError: '',
    } 
  }

  componentWillReceiveProps() {
    this.setState({
      name:'',
      email:'',
      newPass:'',
      reenterPass:'',
      nameError: '',
      emailError: '',
      newPassError: '',
      reenterPassError: '',
    })
  }

  changePasswordHandler = () => {
    this.setState({
      nameError: '',
      emailError: '',
      newPassError: '',
      reenterPassError: '',
    })
    if (this.state.name !== '' && this.state.email !== '' && this.state.newPass !== '' && this.state.reenterPass !== '') {
      const data = {
        'name': this.state.name,
        'email': this.state.email,
        'password': this.state.newPass,
        'c_password': this.state.newPass,
        'role': this.props.role.toLowerCase()
      }
      if (this.state.newPass !== this.state.reenterPass) {
        this.setState({ reenterPassError: 'Password not match' });
      }
      else {
        this.props.handleClose();
        this.props.register(data);
      }
    }
    if (this.state.name === '')
      this.setState({ nameError: `Name can't be empty` });
    if (this.state.email === '')
      this.setState({ emailError: `Email can't be empty` });
    if (this.state.newPass === '')
      this.setState({ newPassError: `Password can't be empty` });
    if (this.state.reenterPass === '')
      this.setState({ reenterPassError: `Password can't be empty` });
  }

  textChangeHandler = (e) => {
    switch (e.currentTarget.name) {
      case 'Password':
        this.setState({ newPass: e.currentTarget.value })
        break;
      case 'Reenter Password':
        this.setState({ reenterPass: e.currentTarget.value })
        break;
      default:
        break;
    }
  }

  nameChangeHandler = (e) => {
    this.setState({ name: e.currentTarget.value });
  }

  emailChangeHandler = (e) => {
    this.setState({ email: e.currentTarget.value });
  }

  keyDownHandler = (e) => {
    //if is ENTER key
    if(e.keyCode == 13) {
      this.changePasswordHandler();
    }
  }

  render() {
    console.log(this.props.data)
    return (
      <Dialog
        title={'Add Member'}
        actions={
          [<FlatButton 
            label={'Cancel'} 
            onClick={this.props.handleClose} 
            style={{ 
              color:red600,
              minWidth: '100px', 
              margin: '10px 10px 10px 0px', 
              cursor: 'pointer' }}
          />,
          <FlatButton 
            label={'Add'} 
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
        onRequestClose={this.props.handleClose}>
        <TextField
          name={'decoy'}
          style={{width:'0px',height:'0px'}}/>
        <AutoComplete
          label={'Name'}
          fullWidth={true}
          filter={AutoComplete.noFilter}
          openOnFocus={true}
          dataSource={this.props.data}
          floatingLabelText={'Name'}
          errorText={this.state.nameError}
          onKeyDown={this.keyDownHandler}
          onChange={this.nameChangeHandler} /> 
      </Dialog>
    );
  }
}

export default AddMemberDialog;