import React, { Component } from 'react';
import {
  Dialog,
  Checkbox,
  FlatButton,
  Paper,
  Avatar
} from 'material-ui';
import { red600 } from 'material-ui/styles/colors';

class AddMemberDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: []
    } 
  }

  componentWillReceiveProps() {
    this.setState({
      members: []
    })
  }

  addMemberHandler = () => {
    if(this.state.members.length !== 0) {
      this.props.addMember(this.state.members, this.props.groupId);
    }

    this.props.handleClose();
  }

  render() {
    const { data } = this.props;
    console.log(this.props)

    return (
      <Dialog
        title={'Thêm thành viên'}
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
            label={'Thêm thành viên'} 
            onClick={this.addMemberHandler} 
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
        {data && data.map(user => 
          <Paper className="d-flex align-items-center" key={user.id} style={{margin:'10px 0px'}}>
            <Checkbox
              style = {{width: '24px', height: '24px',marginLeft: '12px'}}
              onCheck = {(e, checked) => {
                if(checked) {
                  var { members } = this.state;
                  members.push(user.username);
                  this.setState({
                    members
                  })
                } else {
                  var { members } = this.state;
                  members = members.filter(a => a != user.username);
                  this.setState({
                    members
                  })
                }
              }}
            />
            <div className="d-flex justify-content-center align-items-center">
              <Avatar 
                src={user.avatar}
                size={80}
                style={{margin:'10px'}}
              />
              <div className="d-flex flex-column align-items-start justify-content-center" style={{width:'75%'}}>
                <span className="title">{user.name}</span>
                <span>{user.username}</span> 
                <span>{user.department}</span>
              </div>
            </div>
          </Paper> 
        )}
      </Dialog>
    );
  }
}

export default AddMemberDialog;