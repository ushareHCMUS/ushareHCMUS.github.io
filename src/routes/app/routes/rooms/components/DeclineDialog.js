import React, { Component } from 'react';
import {
  Dialog,
  TextField,
  FlatButton,
} from 'material-ui';
import { red600 } from 'material-ui/styles/colors';

class DeclineDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: '',
      reasonErr: ''
    } 
  }

  componentWillReceiveProps() {
    this.setState({
      reason: '',
      reasonErr: ''
    })
  }

  declineHandler = () => {
    this.setState({
      reasonErr: ''
    })

    if (this.state.reason !== '') {
      this.props.handleClose();
      this.props.decline(this.state.reason);
    }

    if(this.state.reason == '') {
      this.setState({ 
        reasonErr: 'Lý do không được rỗng'
      });
    }
  }

  render() {
    return (
      <Dialog
        title={'Từ chối đặt phòng'}
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
            label={'Huỷ đặt phòng'} 
            onClick={this.declineHandler} 
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
          floatingLabelText={'Lý do'}
          onChange={(e) => this.setState({ reason: e.currentTarget.value })}
          name={'Lý do'}
          errorText={this.state.reasonErr}
          fullWidth
        />
      </Dialog>
    );
  }
}

export default DeclineDialog;