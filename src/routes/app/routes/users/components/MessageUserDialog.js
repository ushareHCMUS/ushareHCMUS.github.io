import React, { Component } from 'react';
import {
  Dialog,
  TextField,
  FlatButton,
  Paper,
  CircularProgress
} from 'material-ui';
import { formatUrlDateString, formatUrlTimeString } from '../../../../../utils/helper';
import SendIcon from 'material-ui/svg-icons/content/send';

class MessageUserDialog extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      messContent: '',
      messContentErr: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messContent: '',
      messContentErr: '',
    });
  }

  renderContent() {
    if(this.props.messageData) {
      let messages = JSON.parse(JSON.stringify(this.props.messageData));
      return (
        <div style={{maxHeight:'500px', height: '500px'}} className='dialog-body d-flex flex-column'>
          {Object.keys(messages).map((key) => {
            let millisSecDate = Date(messages[key].time);
            let dateTime = formatUrlTimeString(millisSecDate) + " " + formatUrlDateString(millisSecDate);
            return (messages[key].from == 'admin' ? 
            <div className='d-flex justify-content-end' style={{margin:'4px 0px'}}>
              <Paper style={{padding:'12px', borderRadius:'8px'}} className={'d-flex flex-column'}>
                <div>
                  {messages[key].content}
                </div>
                <div>
                  <i style={{fontSize:'12px', color: '#AAAAAA'}}>{dateTime}</i>
                </div>
              </Paper>
            </div>
            :
            <div className='d-flex' style={{margin:'4px 0px'}}>
              <Paper style={{padding:'12px', backgroundColor: '#00BCD4', color: 'white', borderRadius:'8px'}} className={'d-flex flex-column'}>
                <div>
                  {messages[key].content}
                </div>
                <div>
                  <i style={{fontSize:'12px', color: '#EEEEEE'}}>{dateTime}</i>
                </div>
              </Paper>
            </div>);
          })}
          {this.props.messageData.length == 0 && <CircularProgress/>}
        </div>
      );
    } else {
      return (
        <div style={{maxHeight:'500px', height: '500px'}} className='dialog-body d-flex flex-column'>
          <div style={{margin: "10px 0px", height: "40px"}} className='text-center d-flex justify-content-center align-items-center'>
            <i style={{opacity:0.36,fontSize:'18px',fontWeight:'bold'}}>
              Không có lịch sử chat
            </i>
          </div>
        </div>
      );
    }
  }

	render() {
		return (
			<Dialog
        title={'Sinh viên ' + this.props.userData.name}
				actions={[
					<div className="d-flex flex-row" style={{marginTop: '10px', marginBottom: '10px'}}>
						<TextField
							style={{marginLeft:'18px'}}
              fullWidth
              value={this.state.messContent}
              errorText={this.state.messContentErr}
              onKeyDown={(e) => {
                //check enter
                if(e.keyCode === 13) {
                  if(this.state.messContent.trim() != '') {
                    this.props.addMessage({
                      content: this.state.messContent,
                      from: 'admin',
                      to: this.props.userData.id.toString(),
                      type: 5
                    });
                    this.setState({
                      messContent: ''
                    });
                  }
    
                  if(this.state.messContent.trim() == '') {
                    this.setState({
                      messContentErr: 'Tin nhắn không được rỗng'
                    });
                  }
                }
              }}
              onChange={(e) => {
                this.setState({
                  messContent: e.currentTarget.value
                });
              }}
						/>
						<FlatButton onClick={() => {
              if(this.state.messContent.trim() != '') {
                this.props.addMessage({
                  content: this.state.messContent,
                  from: 'admin',
                  to: this.props.userData.id.toString(),
                  type: 5
                });
                this.setState({
                  messContent: ''
                });
              }

              if(this.state.messContent.trim() == '') {
                this.setState({
                  messContentErr: 'Tin nhắn không được rỗng'
                });
              }
            }}>
							<SendIcon className='d-flex align-items-center justify-content-center' style={{marginLeft:'32px'}} color="#00BCD4"/>
						</FlatButton>
					</div>
				]}
        children={this.renderContent()}
				autoScrollBodyContent={true}
        open={this.props.open}
				titleStyle={{borderBottom: '1px solid #eeeeee'}}
				actionsContainerStyle={{borderTop: '1px solid #eeeeee'}}
				contentStyle={{ width: '100%'}}
				onRequestClose={() => {
          this.setState({
            messContent: '', 
            messContentErr: '',
          });
          this.props.handleClose();
        }}/>
		);
	}
}

export default MessageUserDialog;