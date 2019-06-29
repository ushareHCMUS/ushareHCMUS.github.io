import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PageLoading from '../../../../../components/PageLoading/';
import QueueAnim from 'rc-queue-anim';
import { Redirect } from 'react-router-dom';
import {
  Paper,
  IconButton,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  Avatar,
  TextField,
  RaisedButton,
  Popover,
  Menu,
  MenuItem,
} from 'material-ui';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SearchIcon from 'material-ui/svg-icons/action/search';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import MessageIcon from 'material-ui/svg-icons/communication/message';

import { hashCode, intToRGB } from '../../../../../utils/helper';
import { removeUser, editUserInfo, addUser } from '../actions/';
import DeleteUserDialog from './DeleteUserDialog';
import AddUserDialog from './AddUserDialog';
import EditUserInfoDialog from './EditUserInfoDialog';
import MessageUserDialog from './MessageUserDialog';

const headerTextStyle = {
  fontSize:'18px',
  fontWeight: '500'
}

const bodyTextStyle = {
  fontSize:'16px'
}
class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      menuOpen: false,
      addUserDialogOpen: false,
      editUserDialogOpen: false,
      deleteUserDialogOpen: false,
      messageDialogOpen: false,
      currentUser: {}
    }
  }


  handleSearch = (e) => {
    const search = e.currentTarget.value;
    this.setState({ search });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  menuOpenHandler = (e) => {
    this.setState({
      menuOpen: true,
      anchorEl: e.currentTarget
    });
  }

  addUserDialogCloseHandler = () => {
    this.setState({
      addUserDialogOpen: false
    })
  }

  editUserDialogCloseHandler = () => {
    this.setState({
      editUserDialogOpen: false
    })
  }

  deleteUserDialogCloseHandler = () => {
    this.setState({
      deleteUserDialogOpen: false
    })
  }

  menuCloseHandler = (e) => {
    this.setState({ menuOpen: false });
  }

  renderAvatar(url, name) {
    return <TableRowColumn width={'12%'} className={'text-center'} style={bodyTextStyle} >
            {url ? <Avatar 
              src={url}
              size={80}
              style={{
                margin:'10px 20px'
              }}/>
            :
            <Avatar 
              src={url}
              size={80}
              style={{
                margin:'10px 20px',
                background:intToRGB(hashCode(name))
              }}>
                {name[0]}
              </Avatar>}
          </TableRowColumn>
  }

  renderCol(srcContent) {
    const content = srcContent && srcContent.length >= 23 ? srcContent.substring(0, 20) + "..." : srcContent;

    return <TableRowColumn 
      width={'20%'} 
      className={'text-center'} 
      style={bodyTextStyle}>
      {(content == '' || content == undefined) ? <span style={{fontWeight:'500'}}><i>No information</i></span> : <span style={{fontWeight:'500'}}>{content}</span>}
    </TableRowColumn>
  }

  renderStatusCol(data) {
     return <TableRowColumn 
      width={'20%'} 
      className={'text-center'} 
      style={bodyTextStyle}>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <IconButton 
            children={<EditIcon/>}
            onClick={() => {
              this.setState({ 
                editUserDialogOpen: true,
                currentUser: data
              });
            }}
            tooltip={"Cập nhật thông tin sinh viên"}
          />
          <IconButton 
            children={<MessageIcon color="#00BCD4"/>}
            onClick={() => {
              this.setState({ 
                messa: true,
                currentUser: data
              });
            }}
            tooltip={"Liên hệ sinh viên"}
          />
          <IconButton 
            children={<DeleteIcon color="red"/>}
            onClick={() => {
              this.setState({ 
                deleteUserDialogOpen: true,
                currentUser: data
              });
            }}
            tooltip={"Xoá sinh viên"}
          />
        </div>
    </TableRowColumn>
  }

  handleSearch = (e) => {
    const search = e.currentTarget.value;
    this.setState({ search });
  }

  render() {
    const { auth } = this.props;
    if(!auth.uid && !auth) return <Redirect to='/login'></Redirect>
    if(this.props.users) {
      let users = JSON.parse(JSON.stringify(this.props.users))
      if(this.state.search != '') {
        users = users.filter((user) => (user.name && user.name.toLowerCase().includes(this.state.search)) || 
          (user.id && user.id.toLowerCase().includes(this.state.search)) ||
          (user.department && user.department.toLowerCase().includes(this.state.search))
        );
      }

      return  <QueueAnim type="bottom" className="ui-animate">
        <Paper key="1" className='d-flex flex-row align-items-center' style={{ padding:'10px',borderBottom:'1px solid #E0E0E0'}}>
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
            hintText={'Tìm kiếm theo họ tên, MSSV, Khoa'}
            id="search" type="search"
            onChange={this.handleSearch}
          />
          <div className='d-flex flex-row justify-content-center' style={{margin:'0px 0px 5px 10px'}}>
            <div>
              <RaisedButton
                label='Thao tác'
                labelPosition={'after'}
                style={{width:'140px'}}
                onClick={this.menuOpenHandler}
                icon={<ArrowDropDownIcon style={{marginBottom:'3px'}}/>}>
                  <Popover
                    open={this.state.menuOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    onRequestClose={this.menuCloseHandler}>
                    <Menu>
                      <MenuItem
                        primaryText="Thêm sinh viên"
                        onClick={() => {
                          this.setState({ 
                            menuOpen: false,
                            addUserDialogOpen: true,
                          });
                        }}
                        leftIcon={<PersonAddIcon/>}
                      />
                    </Menu>
                  </Popover>
              </RaisedButton>
            </div>
          </div>
        </Paper>
        <Paper key={"2"}>
          <Table>
            <TableHeader 
              adjustForCheckbox={false} 
              enableSelectAll={false} 
              displaySelectAll={false}>
              <TableRow displayBorder={true}>
                <TableHeaderColumn width='12%' style={headerTextStyle} className={'text-center'}>
                </TableHeaderColumn>
                <TableHeaderColumn  width='20%' style={headerTextStyle} className={'text-center'}>
                  Họ Tên
                </TableHeaderColumn>
                <TableHeaderColumn  width='20%' style={headerTextStyle} className={'text-center'}>
                  MSSV
                </TableHeaderColumn>
                <TableHeaderColumn  width='20%' style={headerTextStyle} className={'text-center'}>
                  Khoa
                </TableHeaderColumn>
                <TableHeaderColumn  width='20%' style={headerTextStyle} className={'text-center'}>
                  Thao tác
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody 
              deselectOnClickaway={true}
              showRowHover={true}
              displayRowCheckbox={false}>
              {users && users.length != 0 ? users.map((user, index) =>
                (<TableRow
                  key={index} 
                  selectable={false} 
                  displayBorder={true} 
                  style={{height:'80px'}} 
                  hoverable={true}>
                    {this.renderAvatar(user.avatar, user.name)}
                    {this.renderCol(user.name)}
                    {this.renderCol(user.id)}
                    {this.renderCol(user.department)}
                    {this.renderStatusCol(user)}
                </TableRow>)
                )
                :
                (<TableRow>
                  <TableRowColumn>
                    <div className='text-center' style={{opacity:0.36,fontSize:'18px',fontWeight:'bold'}}>
                      <i>
                        Không có thông tin
                      </i>
                    </div>
                  </TableRowColumn>
                </TableRow>)
            }
            </TableBody>
          </Table>
        </Paper>
        <AddUserDialog
          currentIds={this.props.usersId}
          open={this.state.addUserDialogOpen}
          handleClose={this.addUserDialogCloseHandler}
          addUser={(userData) => {
            this.props.addUser(userData);
            this.addUserDialogCloseHandler();
          }}
        />
        <DeleteUserDialog
          name={this.state.currentUser.name}
          open={this.state.deleteUserDialogOpen}
          handleClose={this.deleteUserDialogCloseHandler}
          deleteUser={() => {
            this.props.removeUser(this.state.currentUser.username);
            this.deleteUserDialogCloseHandler();
          }}
        />
        <EditUserInfoDialog
          data={this.state.currentUser}
          open={this.state.editUserDialogOpen}
          handleClose={this.editUserDialogCloseHandler}
          editUser={(data) => {
            this.props.editUserInfo(
            this.state.currentUser.username,
            {...this.state.currentUser,
              name: data.name,
              department: data.department,
              username: data.id});
            this.editUserDialogCloseHandler();
          }}
        />
        <MessageUserDialog
          open={this.state.messageDialogOpen}
          handleClose={() => this.setState({ messageDialogOpen: false })}
        />
      </QueueAnim>
    } else {
      return <PageLoading open={true}/>
    }
  }
}

const mapStateToProps = (state) => {
  const users = state.firestore.ordered.users;
  const usersId = users && users.map(user => user.id)
  return {
    auth: state.firebase.auth,
    users,
    usersId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: (userId) => dispatch(removeUser(userId)),
    editUserInfo: (userId ,userInfo) => dispatch(editUserInfo(userId, userInfo)),
    addUser: (userInfo) => dispatch(addUser(userInfo))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'users' }
  ])
)(UsersList)