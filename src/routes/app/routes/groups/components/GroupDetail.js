import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import AddMemberDialog from './AddMemberDialog';
import { removeMember, changeRemoveStatus, addMember } from '../actions/';
import PageLoading from '../../../../../components/PageLoading/';
import {
  Paper,
  Avatar,
  TextField,
  IconButton,
  RaisedButton,
  MenuItem,
  FlatButton
} from 'material-ui';
import QueueAnim from 'rc-queue-anim';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ImportantIcon from 'material-ui/svg-icons/toggle/star';
import { formatUrlDateString, formatUrlTimeString, hashCode, intToRGB } from '../../../../../utils/helper';

class GroupDetails extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userId: '',
      userSearch: '',
      newsSearch: '',
      addMemberDialogOpen: false,
    };
  }

  handleUserSearch = (e) => {
    this.setState({
      userSearch: e.currentTarget.value
    });
  }

  handleNewsSearch = (e) => {
    this.setState({
      newsSearch: e.currentTarget.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  componentWillReceiveProps = (newProps) => {
    if (newProps.users !== this.props.users)
      this.setState({
        users: newProps.users
      })
  }

  renderNews(oriNews) {
    let news = JSON.parse(JSON.stringify(oriNews));

    if(this.state.newsSearch != '') {
      news = news.filter((item) => item.title.toLowerCase().includes(this.state.newsSearch))
    }
    return news && news.length != 0 ? news.map(single => (
      <Paper className="card" key={single.id}>
        <div className="card-header">
          {
            single.isImportant ? <ImportantIcon/> : null
          }
        </div>
        <div className="card-body">
          <h5>{single.title}</h5>
        </div>
        <div className="card-footer text-muted d-flex flex-row align-items-center justify-content-between">
          <b>{'Đăng vào lúc : '}</b> {formatUrlTimeString(single.timeStamp.seconds * 1000) + " " + formatUrlDateString(single.timeStamp.seconds * 1000)}
        </div>
      </Paper>
    )) :
    (<Paper style={{marginTop: "10px", height: "40px"}} className='text-center d-flex justify-content-center align-items-center'>
      <i style={{opacity:0.36,fontSize:'18px',fontWeight:'bold'}}>
        Không có thông tin
      </i>
    </Paper>)
  }

  renderUsers(oriUsers, groupId) {
    let users = JSON.parse(JSON.stringify(oriUsers));

    if(this.state.userSearch != '') {
      users = users.filter((item) => item.name.toLowerCase().includes(this.state.userSearch) 
                                  || item.department.toLowerCase().includes(this.state.userSearch)
                                  || item.username.toLowerCase().includes(this.state.userSearch))
    }

    return users && users.length != 0 ? users.map(user => (
        <Paper className="d-flex align-items-center justify-content-between" key={user.id} style={{margin:'10px 0px'}}>
          <div className="d-flex flex-row align-items-center justify-content-center">
            {user.avatar ? <Avatar 
              src={user.avatar}
              size={80}
              style={{
                margin:'10px 20px'
              }}/>
            :
            <Avatar 
              size={80}
              style={{
                margin:'10px 20px',
                background:intToRGB(hashCode(user.name))
              }}>
                A
            </Avatar>}
            <div className="d-flex flex-column align-items-start justify-content-center" style={{width:'75%'}}>
              <span className="title">{user.name}</span>
              <span>{user.username}</span> 
              <span>{user.department}</span>
            </div>
          </div>
          <FlatButton
            label={'Xoá'}
            style={{color:'red',marginRight:'10px'}}
            onClick={() => {
              this.props.removeMember(user.username ,groupId)
            }}
          />
        </Paper>)
      ) :
      (<Paper style={{margin: "10px 0px", height: "40px"}} className='text-center d-flex justify-content-center align-items-center'>
        <i style={{opacity:0.36,fontSize:'18px',fontWeight:'bold'}}>
          Không có thông tin
        </i>
      </Paper>)
  }

  render() {

    const { group, users, news, auth, nonUsers } = this.props;
    if (!group) return <Redirect to='/'></Redirect>
    if (!auth.uid && !auth) return <Redirect to='/login'></Redirect>
    if (group && users && news && nonUsers) {
      var groupId = ''
      if(group) {
        groupId = group.groupId
      }

      return <QueueAnim type="bottom" className="container ui-animate">
      <Paper key="1">
        <h2 className="page-header text-center" style={{padding:'10px 0px'}}>{group.groupName}</h2>
      </Paper>
      <div className="row" key="2">
        <div className='col-md-4 order-md-2 mb-4'>
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
              hintText={'Tìm kiếm theo tên hoặc mã số sinh viên'}
              id="userSearch" type="search"
              value={this.state.userSearch}
              onChange={this.handleUserSearch}
            />
          </Paper>
          {this.renderUsers(users, groupId)}
          {this.props.nonUsers && 
            (this.props.nonUsers.length != 0 &&
              <RaisedButton style={{width: '100%'}} onClick={() => this.setState({addMemberDialogOpen: true })}>Add member</RaisedButton>)
          }
        </div>

        <div className='col-md-8 order-md-1'>
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
              hintText={'Tìm kiếm theo từ khoá'}
              id="newsSearch" type="search"
              onChange={this.handleNewsSearch}
              value={this.state.newsSearch} 
            />
          </Paper>
          {this.renderNews(news)}
        </div>
      </div>
      <AddMemberDialog
        open={this.state.addMemberDialogOpen}
        data={this.props.nonUsers}
        groupId={groupId}
        addMember={this.props.addMember}
        handleClose={() => {
          this.setState({
            addMemberDialogOpen: false
          })
        }}
      />
    </QueueAnim>
    }
    else {
      return (
        <PageLoading open={true}/>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const groups = state.firestore.ordered.groups;
  //Get selected group
  const group = groups ? groups.filter(target => (target.id === id))[0] : null;
  const users = state.firestore.ordered.users;
  //Get users in selected group
  const groupUsers = users ? users.filter(user => (user.groups !== undefined && user.groups.includes(id))) : null;
  const news = state.firestore.ordered.news;
  const groupNews = news ? news.filter(groupNews => (groupNews.groups !== undefined && groupNews.groups.includes(id))) : null;
  const nonUsers = users ? users.filter(user => (user.groups === undefined || !user.groups.includes(id))) : null;
  return {
    group: group,
    users: groupUsers,
    nonUsers: nonUsers,
    status: state.group.removeStatus,
    news: groupNews,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeMember: (member, group) => dispatch(removeMember(member, group)),
    changeRemoveStatus: () => dispatch(changeRemoveStatus()),
    addMember: (member, group) => dispatch(addMember(member, group)),
    changeAddStatus: () => dispatch(changeAddStatus())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'groups' },
    { collection: 'users' },
    {
      collection: 'news',
      orderBy: [
        ['isImportant', 'desc'],
        ['timeStamp', 'desc']
      ]
    }
  ])
)(GroupDetails);