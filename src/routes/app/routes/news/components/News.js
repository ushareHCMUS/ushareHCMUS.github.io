import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { removeMember, changeRemoveStatus, addNews, editNews } from '../actions/';
import { formatUrlDateString, formatUrlTimeString } from '../../../../../utils/helper';
import PageLoading from '../../../../../components/PageLoading/';
import {
  Paper,
  TextField,
  IconButton,
  RaisedButton,
  Checkbox
} from 'material-ui';
import QueueAnim from 'rc-queue-anim';
import ImportantIcon from 'material-ui/svg-icons/toggle/star';
import SearchIcon from 'material-ui/svg-icons/action/search';
import EditIcon from 'material-ui/svg-icons/image/edit';
import { SocialPeople, SocialPerson } from 'material-ui/svg-icons';
import EditNewsDialog from './EditNewsDialog';

class News extends Component {
  constructor(props) {
    super(props)

    this.state = {
      removeBtn: true,
      isPublic: true,
      isPrivate: false,
      isOpen: false,
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
      newsObject: {}
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

    for(var i = 0;i < news.length; i++) {
      for(var j = 0; j < this.props.groupNames.length; j++) {
        if(news[i].groups == this.props.groupNames[j].groupId) {
          news[i].groupName = this.props.groupNames[j].groupName;
          break;
        }
      }
    }
    return (
      news && (news.length != 0 ? news.map(single => (
        <Paper className="card" key={single.id}>
          <div className="card-header d-flex flex-row justify-content-between">
            <div className='d-flex flex-row align-items-center justify-content-center'>
              {<IconButton
                children={<SocialPerson />} 
                tooltip={single.groupName}
              />}
              {single.isImportant ? <ImportantIcon/> : null}
            </div>
          
            <IconButton
              onClick={(e) => this.setState({ isOpen: true, newsObject: single })}
              children={<EditIcon/>}
            />
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
      </Paper>))
    );
  }

  render() {
    const { news, auth, groupNames, groupsIds } = this.props;
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
                hintText={'Tìm kiếm theo từ khoá'}
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
              <h4 style={{marginLeft:'16px'}}>Tạo tin mới</h4>
            </Paper>
            <Paper style={{marginTop:'10px', padding:'10px'}}>
              <TextField
                floatingLabelText={'Tiêu đề của tin'}
                onChange={(e) => {
                  this.setState({ newsTitle: e.currentTarget.value });
                }}
                errorText={this.state.newsTitleErr}
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
                <div className={'d-flex flex-row align-items-center'}>
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
                <div className={'d-flex flex-row align-item-center'}>
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
                <div className={'d-flex flex-row align-items-center'}>
                  <Checkbox 
                    style={{width:'24px'}}
                    id={id.groupName}
                    onCheck={(e, check) => {
                      var { selectedGroup } = this.state;

                      if(check) {
                        if(!selectedGroup.includes(id.groupId)) {
                          selectedGroup.push(id.groupId);
                        }
                      } else {
                        const index = selectedGroup.indexOf(id.groupId);
 
                        if (index > -1) {
                          selectedGroup.splice(index, 1);
                        }
                      }

                      this.setState({ selectedGroup });
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
                if (this.state.newsTitle != '' && this.state.newsContent != '' && this.state.time != '' && this.state.location != '') {
                  const group = this.state.selectedGroup.length == 0 ? groupNames.map(group => group.groupId) : this.state.selectedGroup;
                  this.props.addNews({
                    title: this.state.newsTitle,
                    content: this.state.newsContent,
                    time: this.state.time,
                    place: this.state.location,
                    isPublic: this.state.isPublic,
                    groupsIds: this.state.selectedGroup,
                    isImportant: true
                  }, group);
                }

                if (this.state.newsTitle == '') {
                  this.setState({ newsTitleErr: 'Tên của tin không được rỗng' });
                } else {
                  this.setState({ newsTitleErr: '' });
                }
            
                if (this.state.newsContent == '') {
                  this.setState({ newsContentErr: 'Nội dung của tin không được rỗng' });
                } else {
                  this.setState({ newsContentErr: '' });
                }
            
                if (this.state.time == '') {
                  this.setState({ timeErr: 'Thời gian không được rỗng' });
                } else {
                  this.setState({ timeErr: '' });
                }
            
                if (this.state.location == '') {
                  this.setState({ locationErr: 'Địa điểm không được rỗng' });
                } else {
                  this.setState({ locationErr: '' });
                }
              }}
            />
          </div>
          <EditNewsDialog
            open={this.state.isOpen}
            data={this.state.newsObject}
            editNews={(data) => {
              const changedData = {
                ...this.state.newsObject,
                content: data.content ,
                title: data.title,
                place: data.place,
                time: data.time
              }
              this.props.editNews(changedData);
            }}
            handleClose={() => {
              this.setState({ isOpen: false })
            }}
          />
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
  return {
    news: news,
    auth: state.firebase.auth,
    groupNames: groupNames,
    groupsIds: groupsIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeMember: (member, group) => dispatch(removeMember(member, group)),
    changeRemoveStatus: () => dispatch(changeRemoveStatus()),
    addNews: (news, groups) => dispatch(addNews(news, groups)),
    editNews: (news) => dispatch(editNews(news))
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