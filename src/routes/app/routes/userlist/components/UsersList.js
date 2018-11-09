import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { getUsers } from '../actions';
import {
  Paper,
  IconButton,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  Toggle,
  TextField,
  RaisedButton,
  Popover,
  Menu,
  MenuItem
} from 'material-ui';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { blue600, red600 } from 'material-ui/styles/colors';
import AddUserDialog from '../../../../../components/Dialogs/AddUserDialog';

const headerTextStyle = {
  fontSize:'14px',
  fontWeight: '500'
}

const bodyTextStyle = {
  fontSize:'14px'
}

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList:[],
      filterText:'',
      menuOpen:false,
      addingRole:'',
      addUserDialogOpen:false
    }
  }

  componentDidMount() {
    this.props.getUsers(() => {
      //if request success
      const { admin, manager, user } = this.props && this.props.usersData;
      const userList = (admin && manager && user) ? [...admin,...manager,...user] : [];
      this.setState({ userList });
    }, () => {
      //if request error
      this.props.history.push('/login');
    });
  }

  searchHandler = (e) => {
    let { filterText } = this.state;
    filterText = e.currentTarget.value;
    this.setState({ filterText });
  }

  menuOpenHandler = (e) => {
    this.setState({
      menuOpen: true,
      anchorEl: e.currentTarget
    });
  }

  menuCloseHandler = (e) => {
    this.setState({ menuOpen: false });
  }

  menuItemClickHandler = (e, menuItem) => {
    this.setState({ 
      menuOpen: false,
      addUserDialogOpen: true,
      addingRole: menuItem.key
    });
  }

  userDialogCloseHandler = (e) => {
    this.setState({ addUserDialogOpen: false });
  }

  statusChangeHandler = (e) => {

  }

  render() {
    let { userList, filterText } = this.state;
    filterText = filterText.toLowerCase();
    if(filterText != '')
      userList = userList && userList.filter((item) => item.email.toLowerCase().includes(filterText) || item.name.toLowerCase().includes(filterText));
    return (
      <QueueAnim type="bottom" className={'ui-animate'}>
        <div className="no-breadcrumbs content-page">
          <Paper key={'1'}>
            <div className='d-flex flex-row align-items-center' style={{ padding:'10px',borderBottom:'1px solid #E0E0E0'}}>
              <IconButton
                children={<SearchIcon/>}
              />
              <TextField
                name={'decoy'}
                style={{width:'0px',height:'0px'}}
              />
              <TextField
                underlineShow={false}
                fullWidth={true}
                hintText={'Seach by name or email'}
                onChange={this.searchHandler}
              />
              <div className='d-flex flex-row justify-content-center' style={{margin:'0px 0px 5px 10px'}}>
                <div>
                  <RaisedButton
                    label='Actions'
                    labelPosition={'after'}
                    style={{width:'120px'}}
                    onClick={this.menuOpenHandler}
                    icon={<ArrowDropDownIcon style={{marginBottom:'3px'}}/>}>
                      <Popover
                        open={this.state.menuOpen}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        onRequestClose={this.menuCloseHandler}>
                        <Menu
                          onItemClick={this.menuItemClickHandler}>
                          <MenuItem
                            key={'User'}
                            primaryText="Add User"
                            leftIcon={<PersonAdd/>}
                          />
                          <MenuItem
                            key={'Manager'}
                            primaryText="Add Manager"
                            leftIcon={<PersonAdd color={red600}/>}
                          />
                        </Menu>
                      </Popover>
                  </RaisedButton>
                </div>
              </div>
            </div>
            <div>
              <Table>
                <TableHeader 
                  adjustForCheckbox={false} 
                  enableSelectAll={false} 
                  displaySelectAll={false}>
                  <TableRow displayBorder={true}>
                    <TableHeaderColumn width='25%' style={headerTextStyle} className={'text-center'}>
                      Name
                    </TableHeaderColumn>
                    <TableHeaderColumn  width='25%' style={headerTextStyle} className={'text-center'}>
                      Email
                    </TableHeaderColumn>
                    <TableHeaderColumn  width='20%' style={headerTextStyle} className={'text-center'}>
                      Role
                    </TableHeaderColumn>
                    <TableHeaderColumn  width='20%' style={headerTextStyle} className={'text-center'}>
                      Status
                    </TableHeaderColumn>
                    <TableHeaderColumn  width='10%' style={headerTextStyle} className={'text-center'}>
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {userList.length != 0 ? 
                  userList.map((user,index) =>
                  (<TableRow
                    key={index} 
                    selectable={false} 
                    displayBorder={true} 
                    style={{height:'80px'}} 
                    hoverable={true}>
                    <TableRowColumn width={'25%'} className={'text-center'} style={bodyTextStyle}>
                      {(user.name == '' || user.name == undefined) ? <span style={{fontWeight:'500'}}><i>No information</i></span> : <span style={{fontWeight:'500'}}>{user.name}</span>}
                    </TableRowColumn>
                    <TableRowColumn width={'25%'} className={'text-center'} style={bodyTextStyle}>
                      {(user.email == '' || user.email == undefined) ? <span style={{fontWeight:'500'}}><i>No information</i></span> : <span style={{fontWeight:'500'}}>{user.email}</span>}
                    </TableRowColumn>
                    <TableRowColumn width={'20%'} className={'text-center'} style={bodyTextStyle}>
                      {(user.role == '' || user.role == undefined) ? <span style={{fontWeight:'500'}}><i>No information</i></span> : <span style={{fontWeight:'500',color:blue600}}>{user.role}</span>}
                    </TableRowColumn>
                    <TableRowColumn width={'20%'} className={'text-center'} style={bodyTextStyle}>
                      <IconButton
                        disableFocusRipple={true}
                        disableKeyboardFocus={true}
                        disableTouchRipple={true}
                        style={{marginRight:'15px',padding:'5px'}}
                        children=
                        {<Toggle
                          defaultToggled={user.status && user.status == "1"}
                          onToggle={this.statusChangeHandler}
                        />}
                      />
                    </TableRowColumn>
                    <TableRowColumn width={'10%'} className={'text-center'} style={bodyTextStyle}>
                    </TableRowColumn>
                  </TableRow>)
                  )
                  :
                  (<TableRow>
                    <TableRowColumn>
                      <div className='text-center' style={{opacity:0.36,fontSize:'17px',fontWeight:'bold'}}>
                        <i>
                          No Informations
                        </i>
                      </div>
                    </TableRowColumn>
                  </TableRow>)}
                </TableBody>
              </Table>
            </div>
            <AddUserDialog
              role={this.state.addingRole}
              open={this.state.addUserDialogOpen}
              handleClose={this.userDialogCloseHandler}
            />
          </Paper>
        </div>
      </QueueAnim>
    );
  }
}

function mapStateToProps(state) {
  return {
    usersData: state.usersData
  };
}

const mapDispatchToProps = {
  getUsers
};

export default connect(mapStateToProps,mapDispatchToProps)(UsersList);