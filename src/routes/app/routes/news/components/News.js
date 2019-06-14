import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { removeMember, changeRemoveStatus } from '../actions/';
import PageLoading from '../../../../../components/PageLoading/';
import {
  Paper,
  TextField,
  IconButton
} from 'material-ui';
import QueueAnim from 'rc-queue-anim';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ImportantIcon from 'material-ui/svg-icons/toggle/star';

class News extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      userId: '',
      removeBtn: true,
      newsSearch: '',
      news: null
    };
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
    if (this.state.news === null)
      this.setState({ news: this.props.news });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  renderNews = (news) => {
    return (
        news && (!this.state.news ? (news.length != 0 ? news.map(single => (
          // <Link to={`/news/${single.id}`} style={{ textDecoration: 'none' }} key={single.id}>
            <Paper className="card"  key={single.id}>
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

  render() {

    const { news, auth } = this.props;
    if(!auth.uid && !auth) return <Redirect to='/login'/>

    if (news) {
      return (
        <QueueAnim type="bottom" className="ui-animate container">
          <div className="row" key="1">
      {/* <Paper>
        <h2 className="page-header text-center" style={{padding:'10px 0px'}}>{group.groupName}</h2>
      </Paper> */}
            <div className='col-md-8 order-md-1'>
              <div className='col-md-12'>
                <Paper className='d-flex flex-row align-items-center' style={{ padding:'10px',borderBottom:'1px solid #E0E0E0'}}>
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
          </div>
          <div className='col-md-4 order-md-2 mb-4' key="2">
            
          </div>
        </QueueAnim>
      )
    }
    else {
      return (
        <PageLoading open={true} />
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const news = state.firestore.ordered.news;
  const groupNews = news ? news.filter(groupNews => (groupNews.isPublic !== undefined && groupNews.isPublic === true)) : null;
  return {
    news: groupNews,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeMember: (member, group) => dispatch(removeMember(member, group)),
    changeRemoveStatus: () => dispatch(changeRemoveStatus())
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'groups' },
    {
      collection: 'news',
      orderBy: [
        ['isImportant', 'desc'],
        ['timeStamp', 'desc']
      ]
    }
  ])
)(News);