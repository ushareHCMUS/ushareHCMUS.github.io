import React, { Component } from 'react';
import {
  Dialog,
  FlatButton
} from 'material-ui';

class PopupDialog extends Component {
  render() {
    return (
      <Dialog
        title={this.props.dialogTitle}
        modal={false}
        open={this.props.isOpen}
        style={{ zIndex: 9999 }}
        autoScrollBodyContent
        actions={[<FlatButton
          label="OK"
          onClick={this.props.handleCloseModal}
        />]}
        onRequestClose={this.props.handleCloseModal}>
        {this.props.content}
      </Dialog>
    )
  }
}

export default PopupDialog;