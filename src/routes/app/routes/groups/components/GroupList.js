import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PageLoading from '../../../../../components/PageLoading/';
import QueueAnim from 'rc-queue-anim';
import { Redirect } from 'react-router-dom';
// import AddMemberDialog from './AddMemberDialog';
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
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SearchIcon from 'material-ui/svg-icons/action/search';

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
      groups: null,
      menuOpen: false,
      addUserDialogOpen: false,
    }
  }

  handleSearch = (e) => {
    const { groups } = this.props;
    this.setState({
      [e.target.id]: e.target.value
    }, () => {

      if (this.state.search !== '' || this.state.search !== null) {
        const filteredGroups = groups.filter(group => 
          (group.groupName.toLowerCase().includes(this.state.search.toLowerCase())) ||
          (group.groupDescription.toLowerCase().includes(this.state.search.toLowerCase())));
        this.setState({
          groups: filteredGroups
        })
      }
      if (this.state.search === null || this.state.search === '')
        this.setState({
          groups
        })
    });
  }

  changeState = (groups) => {
    if (this.state.groups === null)
      this.setState({
        groups
      })
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

  menuItemClickHandler = (e, menuItem) => {
    this.setState({ 
      menuOpen: false,
      addUserDialogOpen: true,
    });
  }

  renderCol(content) {
    return <TableRowColumn 
      width={'20%'} 
      className={'text-center'} 
      style={bodyTextStyle}>
      {(content == '' || content == undefined) ? <span style={{fontWeight:'500'}}><i>No information</i></span> : <span style={{fontWeight:'500'}}>{content}</span>}
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
    const { groups, auth } = this.props;

    if(!auth.uid && !auth) return <Redirect to='/login'></Redirect>
    if (groups) {
      this.changeState(this.props.groups);

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
              hintText={'Seach by name or email'}
              id="search" type="search"
              onChange={this.handleSearch}
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
                          primaryText="Thêm nhóm"
                          leftIcon={<PersonAdd/>}
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
                {this.state.groups ? 
                (this.state.groups.length != 0 ? this.state.groups.map((group, index) =>
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
                      {this.renderCol(group.members.length)}
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
          {/* <AddMemberDialog
            open={this.state.addUserDialogOpen}
            handleClose={() => {
              this.setState({
                addUserDialogOpen: false
              })
            }}
          /> */}
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
  return {
    groups: groupsList,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'groups' }
  ])
)(GroupList)