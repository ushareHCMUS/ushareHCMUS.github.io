import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { connect } from 'react-redux';
import { logout, changePassword } from '../../routes/login/actions';
import { withRouter } from 'react-router-dom';
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
      // this.props.logout();
      this.props.history.push('/login');
    }
    else {
      this.setState({ dialogOpen:true });
    }
  }

  dialogCloseHandler = () => {
    this.setState({ dialogOpen : false });
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
            {/* <MenuItem
              value="changePassword"
              primaryText="Change Password"
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">vpn_key</i>}/> */}
            <MenuItem
              value="login"
              primaryText="Log Out"
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">forward</i>}/>
          </IconMenu>
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