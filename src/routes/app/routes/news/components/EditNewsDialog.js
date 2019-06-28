import React, { Component } from 'react';
import {
  Dialog,
  TextField,
  FlatButton,
} from 'material-ui';
import { red600 } from 'material-ui/styles/colors';

class EditNewsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      place: '',
      time: '',
      title: '',
      contentErr: '',
      placeErr: '',
      timeErr: '',
      titleErr: '',
    } 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      contentErr: '',
      placeErr: '',
      timeErr: '',
      titleErr: '',
      content: nextProps.data.content ,
      place: nextProps.data.place,
      time: nextProps.data.time,
      title: nextProps.data.title,
    })
  }

  editNewsHandler = () => {
    this.setState({
      contentErr: '',
      placeErr: '',
      timeErr: '',
      titleErr: '',
    })
    if (this.state.content !== '' && this.state.place !== '' && this.state.time !== '') {
      this.props.editNews({
        content: this.state.content ,
        place: this.state.place,
        time: this.state.time,
        title: this.state.title,
      })
    }

    if(this.state.title == '') {
      this.setState({ 
        titleErr: 'Tiêu đề tin không được rỗng'
      });
    }

    if(this.state.time == '') {
      this.setState({ 
        timeErr: 'Thời gian diễn ra không được rỗng'
      });
    }

    if(this.state.content == '') {
      this.setState({ 
        contentErr: 'Nội dung tin không được rỗng'
      });
    }

    if(this.state.place == '') {
      this.setState({ 
        placeErr: 'Địa điểm không được rỗng'
      });
    }
  }

  render() {
    return (
      <Dialog
        title={'Cập nhật tin'}
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
          floatingLabelText={'Tiêu đề'}
          onChange={(e) => {
            this.setState({
              title: e.currentTarget.value
            })
          }}
          value={this.state.title}
          errorText={this.state.titleErr}
          fullWidth
        />
        <TextField
          floatingLabelText={'Nội dung'}
          onChange={(e) => {
            this.setState({
              content: e.currentTarget.value
            })
          }}
          value={this.state.content}
          errorText={this.state.contentErr}
          fullWidth
        />
        <TextField
          floatingLabelText={'Địa điểm'}
          onChange={(e) => {
            this.setState({
              place: e.currentTarget.value
            })
          }}
          value={this.state.place}
          errorText={this.state.placeErr}
          fullWidth
        />
        <TextField
          floatingLabelText={'Thời gian'}
          onChange={(e) => {
            this.setState({
              time: e.currentTarget.value
            })
          }}
          value={this.state.time}
          errorText={this.state.timeErr}
          fullWidth
        />
      </Dialog>
    );
  }
}

export default EditNewsDialog;