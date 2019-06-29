import React, { Component } from 'react';
import {
  Dialog,
  TextField,
  FlatButton,
} from 'material-ui';
import { red600 } from 'material-ui/styles/colors';

class MessageUserDialog extends Component {
  constructor(props) {
		super(props);

		this.state = {

		}
	}
	render() {
		return (
			<Dialog
			title={'Cập nhật thông tin sinh viên'}
			// actions={
			// 	[<FlatButton 
			// 		label={'Huỷ'} 
			// 		onClick={this.props.handleClose} 
			// 		style={{ 
			// 			color:red600,
			// 			minWidth: '100px', 
			// 			margin: '10px 10px 10px 0px', 
			// 			cursor: 'pointer' }}
			// 	/>,
			// 	<FlatButton 
			// 		label={'Cập nhật'} 
			// 		onClick={this.editNewsHandler} 
			// 		style={{ 
			// 			minWidth: '100px', 
			// 			margin: '10px 10px 10px 0px', 
			// 			cursor: 'pointer' }}
			// 	/>]
			// }
			autoScrollBodyContent={true}
			open={this.props.open}
			contentStyle={{ width: '100%' }}
			onRequestClose={this.props.handleClose}>
			
			</Dialog>
		);
	}

}

export default MessageUserDialog;