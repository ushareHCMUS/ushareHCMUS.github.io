import React, { Component } from 'react';
import {
  Dialog,
  TextField,
  FlatButton,
} from 'material-ui';
import { red600 } from 'material-ui/styles/colors';

class AddGroupDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      id: '',
      image:'',
      name: '',
      members: [],
      descriptionErr: '',
      idErr: '',
      nameErr: '',
      imageErr: '',
    } 
  }

  componentWillReceiveProps() {
    this.setState({
      description: '',
      id: '',
      image:'',
      name: '',
      descriptionErr: '',
      idErr: '',
      nameErr: '',
      imageErr: ''
    })
  }

  addGroupHandler = () => {
    this.setState({
      descriptionErr: '',
      idErr: '',
      nameErr: '',
      imageErr: ''
    })
    if (this.state.description !== '' && this.state.id !== '' && this.state.image !== '' && this.state.name !== '') {
      const data = {
        'groupDescription': this.state.description,
        'groupId': this.state.id,
        'groupImage': this.state.image,
        'groupName': this.state.name,
        'members': [],
        'news': [],
        'timeCreated': undefined
      }
      this.props.handleClose();
      this.props.addGroup(data);
    }

    if(this.state.description.trim() == '') {
      this.setState({ 
        descriptionErr: 'Mô tả nhóm không được rỗng'
      });
    }

    if(this.state.id.trim() == '') {
      this.setState({ 
        idErr: 'Id nhóm không được rỗng'
      });
    }

    if(this.state.image.trim() == '') {
      this.setState({ 
        imageErr: 'Hình đại diện của nhóm không được rỗng'
      });
    }

    if(this.state.name.trim() == '') {
      this.setState({ 
        nameErr: 'Tên nhóm không được rỗng'
      });
    }
  }

  onTextChange = (e, fieldKey) => {
    switch(fieldKey) {
      case 'Tên nhóm':
        this.setState({ name: e.currentTarget.value });
        break;
      case 'Mô tả nhóm':
        this.setState({ description: e.currentTarget.value });
        break;
      case 'Id nhóm':
        this.setState({ id: e.currentTarget.value });
        break;
      case 'Hình đại diện của nhóm':
        this.setState({ image: e.currentTarget.value });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Dialog
        title={'Thêm nhóm'}
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
            label={'Thêm nhóm'} 
            onClick={this.addGroupHandler} 
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
          floatingLabelText={'Tên nhóm'}
          onChange={(e) => this.onTextChange(e, 'Tên nhóm')}
          name={'Tên nhóm'}
          errorText={this.state.nameErr}
          fullWidth
        />
        <TextField
          floatingLabelText={'Id nhóm'}
          onChange={(e) => this.onTextChange(e, 'Id nhóm')}
          name={'Id nhóm'}
          errorText={this.state.idErr}
          fullWidth
        />
        <TextField
          floatingLabelText={'Mô tả nhóm'}
          onChange={(e) => this.onTextChange(e, 'Mô tả nhóm')}
          name={'Mô tả nhóm'}
          errorText={this.state.descriptionErr}
          fullWidth
        />
        <TextField
          floatingLabelText={'Hình đại diện của nhóm'}
          onChange={(e) => this.onTextChange(e, 'Hình đại diện của nhóm')}
          name={'Hình đại diện của nhóm'}
          errorText={this.state.nameErr}
          fullWidth
        />
      </Dialog>
    );
  }
}

export default AddGroupDialog;