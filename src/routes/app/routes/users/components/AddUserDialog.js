import React, { Component } from 'react';
import {
  Dialog,
  TextField,
  FlatButton,
  AutoComplete
} from 'material-ui';
import { red600 } from 'material-ui/styles/colors';

class AddUserDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      id: '',
      department: '',
      sex: '',
      nameErr: '',
      idErr: '',
      departmentErr: '',
      sexErr: ''
    }
  }  

  addUserHanlder = () => {
    this.setState({
      nameErr: '',
      idErr: '',
      departmentErr: '',
      sexErr: ''
    })
    if (this.state.name !== '' && this.state.department !== '' && this.state.id !== '' && this.state.sex !== '' && !this.props.currentIds.includes(this.state.id.trim())) {
      this.props.addUser({
        name: this.state.name,
        department: this.state.department,
        id: this.state.id,
        sex: this.state.sex
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
        departmentErr: 'Khoa của sinh viên không được rỗng'
      });
    }

    if(this.state.id.trim() == '') {
      this.setState({ 
        idErr: 'MSSV không được rỗng'
      });
    }

    if(this.state.sex.trim() == '') {
      this.setState({ 
        sexErr: 'Giới tính không được rỗng'
      });
    }

    if(this.props.currentIds.includes(this.state.id.trim())) {
      this.setState({ 
        idErr: 'MSSV không được trùng lặp'
      });
    }
  }
  
  render() {
    return (
      <Dialog
        title={'Thêm sinh viên mới'}
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
            label={'Thêm sinh viên'} 
            onClick={this.addUserHanlder} 
            style={{ 
              minWidth: '100px', 
              margin: '10px 10px 10px 0px', 
              cursor: 'pointer',
              color: '#00BCD4'
            }}
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
        <AutoComplete
          floatingLabelText={'Giới tính'}
          defaultValue={this.state.sex}
          onUpdateInput={(text) => {
            this.setState({
              sex: text
            })
          }}
          dataSource={['Nam', 'Nữ']}
          errorText={this.state.sexErr}
          fullWidth
        />
      </Dialog>
    )
  }
}

export default AddUserDialog;