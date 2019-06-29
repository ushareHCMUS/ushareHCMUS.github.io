import React, { Component } from 'react';
import {
  Dialog,
  FlatButton,
} from 'material-ui';
import { red600 } from 'material-ui/styles/colors';

class DeleteUserDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dialog
        title={'Xoá sinh viên'}
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
            label={'Xoá'} 
            onClick={() => {
              this.props.deleteUser();
              this.props.handleClose();
            }} 
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
          Xoá sinh viên <b>{this.props.name}</b> ?
      </Dialog>
    );
  }
}

export default DeleteUserDialog;