import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
// import AddMemberDialog from './AddMemberDialog';
import { removeMember, changeRemoveStatus } from '../actions/';
import PageLoading from '../../../../../components/PageLoading/';
import {
  Paper,
  Avatar,
  TextField,
  IconButton,
  RaisedButton,
  MenuItem
} from 'material-ui';
import QueueAnim from 'rc-queue-anim';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ImportantIcon from 'material-ui/svg-icons/toggle/star';

class GroupDetails extends Component {

  constructor(props) {
    super(props)

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      userId: '',
      removeBtn: true,
      userSearch: '',
      users: null,
      newsSearch: '',
      news: null,
      addUserDialogOpen: false,
    };
  }

  handleClose() {
    this.setState({
      show: false,
      userId: ''
    });
    this.props.changeRemoveStatus();
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClick = (userId) => {
    this.setState({
      userId: userId
    })
    this.handleShow();
  }

  handleRemove = () => {
    this.props.removeMember(this.state.userId, this.props.group.id);
  }

  handleNoti = () => {
    if (this.props.status === "Success")
      return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Successfully removed {this.state.userId}
        </div>
      )
    if (this.props.status !== null && this.props.status !== "Success")
      return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {this.props.status}
        </div>
      )
  }

  removeBtn = () => {
    if (this.props.status === null)
      return (
        <Button variant="danger" onClick={this.handleRemove}>Remove</Button>
      )
  }

  handleUserSearch = (e) => {
    const { users } = this.props;
    this.setState({
      [e.target.id]: e.target.value
    }, () => {

      if (this.state.userSearch !== '' || this.state.userSearch !== null) {
        const filteredUsers = users.filter(user =>
          (
            user.name.toLowerCase().includes(this.state.userSearch.toLocaleLowerCase()) || user.id.includes(this.state.userSearch)
          )
        );
        this.setState({
          users: filteredUsers
        })
      }
      if (this.state.userSearch === null || this.state.userSearch === '' || this.state.users === null)
        this.setState({
          users
        })
    });
  }

  handleNewsSearch = (e) => {
    const { news } = this.props;
    if (this.state.news === null)
      this.setState({ news: this.props.news });
    this.setState({
      [e.target.id]: e.target.value
    }, () => {

      if (this.state.newsSearch !== '' || this.state.newsSearch !== null) {
        const filteredNews = news.filter(single =>
          (
            single.title.toLowerCase().includes(this.state.newsSearch.toLocaleLowerCase())
          )
        );
        this.setState({
          news: filteredNews
        })
      }
      if (this.state.newsSearch === null || this.state.newsSearch === '' || this.state.news === null)
        this.setState({
          news
        })
    });
  }

  changeState = () => {
    if (this.state.users === null)
      this.setState({ users: this.props.users });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  renderNews = (news) => {
      return (
        news && (!this.state.news ? (news.length != 0 ? news.map(single => (
            // <Link to={`/news/${single.id}`} style={{ textDecoration: 'none' }} key={single.id}>
              <Paper className="card" key={single.id}>
                <div className="card-body">
                  <h5>{single.title}</h5>
                </div>
                <div className="card-footer text-muted">
                  {single.timeStamp.toDate().toString()}
                  {
                    single.isImportant ? <ImportantIcon/> : null
                  }
                </div>
              </Paper>
            // </Link>
          )) :
          (<Paper style={{marginTop: "10px", height: "40px"}} className='text-center d-flex justify-content-center align-items-center'>
            <i style={{opacity:0.36,fontSize:'18px',fontWeight:'bold'}}>
              Không có thông tin
            </i>
          </Paper>)
        )
        :
        (this.state.news.length != 0 ? this.state.news.map(single => (
          // <Link to={`/news/${single.id}`} style={{ textDecoration: 'none' }} key={single.id}>
            <div className="card" key={single.id}>
              <div className="card-body">
                <h5>{single.title}</h5>
              </div>
              <div className="card-footer text-muted">
                {single.timeStamp.toDate().toString()}
                {
                  single.isImportant ? <ImportantIcon/> : null
                }
              </div>
            </div>
          // </Link>
        )) :
        (<Paper style={{marginTop: "10px",height: "40px"}} className='text-center d-flex justify-content-center align-items-center'>
          <i style={{opacity:0.36,fontSize:'18px',fontWeight:'bold'}}>
            Không có thông tin
          </i>
        </Paper>)
        )
      )
    );
  }

  componentWillReceiveProps = (newProps) => {
    if (newProps.users !== this.props.users)
      this.setState({
        users: newProps.users
      })
  }

  render() {

    const { group, users, news, auth, nonUsers } = this.props;
    if (!group) return <Redirect to='/'></Redirect>
    if (!auth.uid && !auth) return <Redirect to='/login'></Redirect>
    if (group && users && news && nonUsers) {
      this.changeState();
        
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
              hintText={'Seach by name or email'}
              id="userSearch" type="search"
              value={this.state.userSearch}
              onChange={this.handleUserSearch}
            />
          </Paper>
          {
            this.state.users && this.state.users.length != 0 ? this.state.users.map(user => (
              <Paper className="d-flex" key={user.id} style={{margin:'10px 0px'}}>
                <Avatar 
                  src={user.avatar}
                  size={80}
                  style={{margin:'10px', width: '90px'}}
                />
                <div className="d-flex flex-column align-items-start justify-content-center" style={{width:'75%'}}>
                  <span className="title">{user.name}</span>
                  <span>{user.username}</span> 
                  <span>{user.department}</span>
                </div>
              </Paper>)
            ) :
            (<Paper style={{margin: "10px 0px", height: "40px"}} className='text-center d-flex justify-content-center align-items-center'>
              <i style={{opacity:0.36,fontSize:'18px',fontWeight:'bold'}}>
                Không có thông tin
              </i>
            </Paper>)
          }
          <RaisedButton style={{width: '100%'}} onClick={() => this.setState({addUserDialogOpen: true })}>Add member</RaisedButton>
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
              hintText={'Seach by name or email'}
              id="newsSearch" type="search"
              onChange={this.handleNewsSearch}
              value={this.state.newsSearch} 
            />
          </Paper>
          {
            this.renderNews(news)
          }
        </div>
      </div>
      {/* <AddMemberDialog
        open={this.state.addUserDialogOpen}
        data={this.props.nonUsers}
        handleClose={() => {
          this.setState({
            addUserDialogOpen: false
          })
        }}
      /> */}
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