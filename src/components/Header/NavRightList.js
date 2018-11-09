import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { connect } from 'react-redux';
import Auth from '../../utils/Auth';
import { logout, changePassword } from '../../routes/login/actions';
import { withRouter } from 'react-router-dom';
import ChangePasswordDialog from '../Dialogs/ChangePasswordDialog';
import PopupDialog from '../Dialogs/PopupDialog';

const ImgIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '50px' // 36 + 16, algin with sub list
};

class NavRightList extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      dialogOpen:false,
      alertDialogOpen:false,
      alertDialogTitle: '',
      alertDialogContent: '',
    }
  }

  handleChange = (event, value) => {
    if(value == 'login') {
      this.props.logout();
      this.props.history.push('/login');
      Auth.removeAuth();
    }
    else {
      this.setState({ dialogOpen:true });
    }
  }

  dialogCloseHandler = () => {
    this.setState({ dialogOpen : false });
  }

  changePasswordHandler = (data) => {
    console.log(data);

    this.props.changePassword(data, () => {
      //success
      this.setState({ 
        alertDialogOpen: true,
        alertDialogTitle: 'Change Password Success',
        alertDialogContent: 'Your password has been changed.'
      });
    }, () => {
      //fail
      console.log('fail')
      this.setState({ 
        alertDialogOpen: true,
        alertDialogTitle: 'Change Password Fail',
        alertDialogContent: 'Your password has not been changed.'
      });
    });
  }

  alertDialogCloseHandler = () => {
    this.setState({ alertDialogOpen: false });
  }

  render() {
    return (
      <ul className="list-unstyled float-right">
        <li style={{marginRight: '10px'}}>
          <IconMenu
            iconButtonElement={<IconButton style={ImgIconButtonStyle}><img src="assets/images/g1.jpg" alt="" className="rounded-circle img30_30" /></IconButton>}
            onChange={this.handleChange}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            menuStyle={{minWidth: '150px'}}>
            {Auth.isAdmin && 
              (<MenuItem
                value="changePassword"
                primaryText="Change Password"
                innerDivStyle={listItemStyle}
                style={{fontSize: '14px', lineHeight: '48px'}}
                leftIcon={<i className="material-icons">vpn_key</i>}/>)
            }
            <MenuItem
              value="login"
              primaryText="Log Out"
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">forward</i>}/>
          </IconMenu>
          <ChangePasswordDialog
            open={this.state.dialogOpen}
            changePassword={this.changePasswordHandler}
            handleClose={this.dialogCloseHandler}
          />
          <PopupDialog
            dialogTitle={this.state.alertDialogTitle}
            content={this.state.alertDialogContent}
            isOpen={this.state.alertDialogOpen}
            handleCloseModal={this.alertDialogCloseHandler}
          />
        </li>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    requestStatus: state.requestStatus,
  }
}

const mapDispatchTopProps = {
  logout,
  changePassword
}

export default connect(mapStateToProps,mapDispatchTopProps)(withRouter(NavRightList));