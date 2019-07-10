import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PageLoading from '../../../../../components/PageLoading/';
import QueueAnim from 'rc-queue-anim';
import { Redirect } from 'react-router-dom';
import AddGroupDialog from './AddGroupDialog';
import DeleteGroupDialog from './DeleteGroupDialog';
import { Link } from 'react-router-dom';
import { formatUrlDateString } from '../../../../../utils/helper';
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
  MenuItem
} from 'material-ui';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { addGroup } from '../actions/';

const headerTextStyle = {
  fontSize:'18px',
  fontWeight: '500'
}

const bodyTextStyle = {
  fontSize:'16px'
}

class GroupList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      menuOpen: false,
      addGroupDialogOpen: false,
      deleteGroupDialogOpen: false,
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

  menuCloseHandler = (e) => {
    this.setState({ menuOpen: false });
  }

  renderCol(srcContent) {
    const content = srcContent.length >= 23 ? srcContent.substring(0, 20) + "..." : srcContent;

    return <TableRowColumn 
      width={'20%'} 
      className={'text-center'} 
      style={bodyTextStyle}>
      {(content == '' || content == undefined) ? <span style={{fontWeight:'500'}}><i>No information</i></span> : <span style={{fontWeight:'500'}}>{content}</span>}
    </TableRowColumn>
  }

  renderMembersCol(content) {
    return <TableRowColumn 
      width={'20%'} 
      className={'text-center'} 
      style={bodyTextStyle}>
      {(content == '' || content == undefined) ? <span style={{fontWeight:'500'}}>0</span> : <span style={{fontWeight:'500'}}>{content}</span>}
    </TableRowColumn>
  }

  renderAvatar(url) {
    return <TableRowColumn width={'10%'} className={'text-center'} style={bodyTextStyle} >
            <Avatar 
              src={url}
              size={80}
              style={{
                margin:'10px 20px'
              }}/>
            </TableRowColumn>
  }

  render() {
    const { auth } = this.props;
    if(!auth.uid && !auth) return <Redirect to='/login'></Redirect>
    if (this.props.groups) {
      let groups = JSON.parse(JSON.stringify(this.props.groups))
      if(this.state.search != '') {
        groups = groups.filter((group) => group.groupDescription.toLowerCase().includes(this.state.search) || 
          group.groupName.toLowerCase().includes(this.state.search)
        )
      }

      return (
        <QueueAnim type="bottom" className="ui-animate">
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
              hintText={'Tìm kiếm theo tên nhóm hoặc mô tả'}
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
                          primaryText="Thêm nhóm"
                          onClick={() => {
                            this.setState({ 
                              menuOpen: false,
                              addGroupDialogOpen: true,
                            });
                          }}
                          leftIcon={<PersonAddIcon/>}
                        />
                        <MenuItem
                          primaryText="Xoá nhóm"
                          onClick={() => {
                            this.setState({
                              menuOpen: false,
                              deleteGroupDialogOpen: true,
                            })
                          }}
                          leftIcon={<RemoveIcon/>}
                        />
                      </Menu>
                    </Popover>
                </RaisedButton>
              </div>
            </div>
          </Paper>
          <Paper key="2">
            <Table>
              <TableHeader 
                adjustForCheckbox={false} 
                enableSelectAll={false} 
                displaySelectAll={false}>
                <TableRow displayBorder={true}>
                  <TableHeaderColumn width='12%' style={headerTextStyle} className={'text-center'}>
                  </TableHeaderColumn>
                  <TableHeaderColumn  width='20%' style={headerTextStyle} className={'text-center'}>
                    Nhóm
                  </TableHeaderColumn>
                  <TableHeaderColumn  width='20%' style={headerTextStyle} className={'text-center'}>
                    Mô tả
                  </TableHeaderColumn>
                  <TableHeaderColumn  width='20%' style={headerTextStyle} className={'text-center'}>
                    Thành viên
                  </TableHeaderColumn>
                  <TableHeaderColumn  width='20%' style={headerTextStyle} className={'text-center'}>
                    Ngày tạo nhóm
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody 
                deselectOnClickaway={true}
                showRowHover={true}
                displayRowCheckbox={false}>
                {groups && groups.length != 0 ? groups.map((group, index) =>
                  (<Link to={`app/groups/${group.id}`} style={{ textDecoration: 'none' }} key={group.id}>
                    <TableRow
                      key={index} 
                      selectable={false} 
                      displayBorder={true} 
                      style={{height:'80px'}} 
                      hoverable={true}>
                      {this.renderAvatar(group.groupImage)}
                      {this.renderCol(group.groupName)}
                      {this.renderCol(group.groupDescription)}
                      {this.renderMembersCol(group.members.length)}
                      {this.renderCol(formatUrlDateString(group.timeCreated.seconds * 1000))}
                    </TableRow>
                  </Link>)
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
          <AddGroupDialog
            open={this.state.addGroupDialogOpen}
            addGroup={this.props.addGroup}
            handleClose={() => {
              this.setState({
                addGroupDialogOpen: false
              })
            }}
          />
          <DeleteGroupDialog
            open={this.state.deleteGroupDialogOpen}
            deleteGroup={() => {}}
            handleClose={() => {
              this.setState({
                deleteGroupDialogOpen: false
              })
            }}
          />
        </QueueAnim>
      )
    }
    else {
      return (
        <PageLoading open={true}/>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const groups = state.firestore.ordered.groups;
  const groupsList = groups ? groups.filter(group => (group.id !== 'hcmus')) : null;
  const users = state.firestore.ordered.users;
  
  return {
    groups: groupsList,
    auth: state.firebase.auth,
    users: users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addGroup: (groupInfo) => dispatch(addGroup(groupInfo))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'groups' },
    { collection: 'users' }
  ])
)(GroupList)