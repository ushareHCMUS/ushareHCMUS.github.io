import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { removeMember, changeRemoveStatus, addNews } from '../actions/';
import PageLoading from '../../../../../components/PageLoading/';
import {
  Paper,
  TextField,
  IconButton,
  RaisedButton,
  Checkbox
} from 'material-ui';
import QueueAnim from 'rc-queue-anim';
import SearchIcon from 'material-ui/svg-icons/action/search';

class News extends Component {
  constructor(props) {
    super(props)

    this.state = {
      removeBtn: true,
      isPublic: true,
      isPrivate: false,
      newsSearch: '',
      selectedGroup: [],
      newsTitle: '',
      newsContent: '',
      time: '',
      location: '',
      newsTitleErr: '',
      newsContentErr: '',
      timeErr: '',
      locationErr: '',
    };
  }

  handleNewsSearch = (e) => {
    this.setState({ newsSearch: e.currentTarget.value });
  }

  renderNews = (oriNews) => {
    let news = JSON.parse(JSON.stringify(oriNews));

    if(this.state.newsSearch != '') {
      news = news.filter((item) => item.title.toLowerCase().includes(this.state.newsSearch))
    }

    return (
      news && (news.length != 0 ? news.map(single => (
        // <Link to={`/news/${single.id}`} style={{ textDecoration: 'none' }} key={single.id}>
          <Paper className="card"  key={single.id}>
            <div className="card-body">
              <h5>{single.title}</h5>
            </div>
            <div className="card-footer text-muted">
              {/* {single.timeStamp.toDate().toString()}
              {
                single.isImportant ? <ImportantIcon/> : null
              } */}
            </div>
          </Paper>
        // </Link>
      )) :
      (<Paper style={{marginTop: "10px", height: "40px"}} className='text-center d-flex justify-content-center align-items-center'>
        <i style={{opacity:0.36,fontSize:'18px',fontWeight:'bold'}}>
          Không có thông tin
        </i>
      </Paper>))
    );
  }

  componentWillReceiveProps() {
    this.setState({
      newsTitleErr: '',
      newsContentErr: '',
      timeErr: '',
      locationErr: '',
    });
  }

  render() {
    const { news, auth, groupNames } = this.props;
    if(!auth.uid && !auth) return <Redirect to='/login'/>
    if (news) {
      return (
        <QueueAnim type="bottom" className="ui-animate container d-flex">
          <div className='col-md-7' key="1">
            <Paper className='d-flex flex-row align-items-center' style={{ padding:'10px', marginTop:'20px',borderBottom:'1px solid #E0E0E0'}}>
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
                onChange={this.handleNewsSearch}
                value={this.state.newsSearch} 
              />
            </Paper>
            {
              this.renderNews(news)
            }
          </div>
          <div className='col-md-5 d-flex flex-column' key="2" style={{padding:'10px', marginTop:'10px'}}>
            <Paper className='d-flex flex-row align-items-center' style={{height:'69px',borderBottom:'1px solid #E0E0E0'}}>
              <h4 style={{marginLeft:'16px'}}>Tin mới</h4>
            </Paper>
            <Paper style={{marginTop:'10px', padding:'10px'}}>
              <TextField
                floatingLabelText={'Tiêu đề của tin'}
                onChange={(e) => {
                  this.setState({ newsTitle: e.currentTarget.value });
                }}
                errorText={this.state.titleErr}
                fullWidth
              />
              <TextField
                floatingLabelText={'Nội dung của tin'}
                multiLine={true}
                onChange={(e) => {
                  this.setState({ newsContent: e.currentTarget.value });
                }}
                errorText={this.state.newsContentErr}
                fullWidth
              />
              <TextField
                floatingLabelText={'Thời gian'}
                multiLine={true}
                onChange={(e) => {
                  this.setState({ time: e.currentTarget.value });
                }}
                errorText={this.state.timeErr}
                fullWidth
              />
              <TextField
                floatingLabelText={'Địa điểm'}
                multiLine={true}
                onChange={(e) => {
                  this.setState({ location: e.currentTarget.value });
                }}
                errorText={this.state.locationErr}
                fullWidth
              />
              <div>
                <h6>Loại tin</h6>
                <div className={'d-flex flex-row'}>
                  <Checkbox 
                    checked={this.state.isPublic} 
                    style={{width:'24px'}}
                    onCheck={(check) => {
                      if(check) {
                        this.setState({
                          isPublic: true,
                          isPrivate: false
                        });
                      }
                    }
                  }/>
                  <div>Công khai</div>
                </div>
                <div className={'d-flex flex-row'}>
                  <Checkbox 
                    checked={this.state.isPrivate} 
                    style={{width:'24px'}}
                    onCheck={(check) => {
                      if(check) {
                        this.setState({
                          isPublic: false,
                          isPrivate: true
                        });
                      }
                    }
                  }/>
                  <div>Nhóm</div>
                </div>
              </div>
              <div style={{marginLeft:'20px'}}>{!this.state.isPublic  && groupNames.map(id => 
                <div className={'d-flex flex-row'}>
                  <Checkbox 
                    style={{width:'24px'}}
                    id={id.groupName}
                    onCheck={(e, check) => {
                      var { selectedGroup } = this.state;

                      if(check) {
                        if(!selectedGroup.includes(id.groupName)) {
                          selectedGroup.push(id.groupId);
                        }
                      } else {
                        var index = selectedGroup.indexOf(id.groupId);
 
                        if (index > -1) {
                          selectedGroup.splice(index, 1);
                        }
                      }
                    }
                  }/>
                  <div>{id.groupName}</div>
                </div>)}
              </div>
            </Paper>
            <RaisedButton 
              style={{marginTop:'10px'}}
              label='Thêm tin mới'
              onClick={() => {
                if (this.state.newsTitle !== '' && this.state.newsContent !== '' && this.state.time !== '' && this.state.location !== '') {
                  this.props.addNews({
                    title: this.state.newsTitle,
                    content: this.state.newsContent,
                    time: this.state.time,
                    place: this.state.location,
                    isPublic: this.state.isPublic,
                    groupsIds: this.state.selectedGroup,
                    isImportant: true
                  }, this.state.selectedGroup.toString());
                }
            
                // if (this.state.newsTitle == '') {
                //   this.setState({ newsTitleErr: 'Tên của tin không được rỗng' });
                // }
            
                // if (this.state.newsContent) {
                //   this.setState({ newsContentErr: 'Nội dung của tin không được rỗng' });
                // }
            
                // if (this.state.time) {
                //   this.setState({ timeErr: 'Thời gian không được rỗng' });
                // }
            
                // if (this.state.location) {
                //   this.setState({ locationErr: 'Địa điểm không được rỗng' });
                // }
                // this.props.addNews()
              }}
            />
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
  const groupsIds = state.firestore.data.groups || [];
  const groupNames = Object.keys(groupsIds).map(id => groupsIds[id]);
  const groupNews = news ? news.filter(groupNews => (groupNews.isPublic !== undefined && groupNews.isPublic === true)) : null;
  return {
    news: groupNews,
    auth: state.firebase.auth,
    groupNames: groupNames
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeMember: (member, group) => dispatch(removeMember(member, group)),
    changeRemoveStatus: () => dispatch(changeRemoveStatus()),
    addNews: (news, groups) => dispatch(addNews(news, groups))
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