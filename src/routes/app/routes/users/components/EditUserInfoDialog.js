import React, { Component } from 'react';
import {
  Dialog,
  TextField,
  FlatButton,
} from 'material-ui';
import { red600 } from 'material-ui/styles/colors';

class EditUserInfoDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      department: '',
      id: '',
      nameErr: '',
      departmentErr: '',
      idErr: '',
    } 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nameErr: '',
      departmentErr: '',
      idErr: '',
      name: nextProps.data.name,
      department: nextProps.data.department,
      id: nextProps.data.username,
    })
  }

  editNewsHandler = () => {
    this.setState({
      nameErr: '',
      departmentErr: '',
      idErr: '',
    })
    if (this.state.name !== '' && this.state.department !== '' && this.state.id !== '') {
      this.props.editUser({
        name: this.state.name,
        department: this.state.department,
        id: this.state.id
      });

      this.props.handleClose();
    }

    if(this.state.name.trim() == '') {
      this.setState({ 
        nameErr: 'Tên của sinh viên không được rỗng'
      });
    }

    if(this.state.department.trim() == '') {
      this.setState({ 
        timeErr: 'Khoa của sinh viên không được rỗng'
      });
    }

    if(this.state.id.trim() == '') {
      this.setState({ 
        contentErr: 'MSSV không được rỗng'
      });
    }
  }

  render() {
    return (
      <Dialog
        title={'Cập nhật thông tin sinh viên'}
        actions={
          [<FlatButton 
            label={'Huỷ'} 
            onClick={this.props.handleClose} 
            style={{ 
              color:red600,
              minWidth: '100px', 
              margin: '10px 10px 10px 0px', 
              cursor: 'pointer' }}
          />,
          <FlatButton 
            label={'Cập nhật'} 
            onClick={this.editNewsHandler} 
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
        <TextField
          floatingLabelText={'Họ tên'}
          onChange={(e) => {
            this.setState({
              name: e.currentTarget.value
            })
          }}
          value={this.state.name}
          errorText={this.state.nameErr}
          fullWidth
        />
        <TextField
          floatingLabelText={'Mã số sinh viên'}
          onChange={(e) => {
            this.setState({
              id: e.currentTarget.value
            })
          }}
          value={this.state.id}
          errorText={this.state.idErr}
          fullWidth
        />
        <TextField
          floatingLabelText={'Khoa'}
          onChange={(e) => {
            this.setState({
              department: e.currentTarget.value
            })
          }}
          value={this.state.department}
          errorText={this.state.departmentErr}
          fullWidth
        />
      </Dialog>
    );
  }
}

export default EditUserInfoDialog;