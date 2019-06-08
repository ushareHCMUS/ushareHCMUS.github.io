import React, { Component } from 'react';
import Group from './Group';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PageLoading from '../../../../../components/PageLoading/';
import QueueAnim from 'rc-queue-anim';
import { Redirect } from 'react-router-dom';

class GroupList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      search: '',
      groups: null
    }
  }

  handleSearch = (e) => {
    const { groups } = this.props;
    this.setState({
      [e.target.id]: e.target.value
    }, () => {

      if (this.state.search !== '' || this.state.search !== null) {
        const filteredGroups = groups.filter(group => (group.groupName.toLowerCase().includes(this.state.search.toLowerCase())));
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

  render() {

    const { groups, auth } = this.props;
    
    if(!auth.uid && !auth) return <Redirect to='/login'></Redirect>
    if (groups) {
      this.changeState(groups);
      return (
        <QueueAnim type="bottom" className="ui-animate">
            <div className='container' key="1">
              <ul className="collection with-header">
                <li className="collection-header"><h4 className='mx-auto'>Groups list</h4></li>
                <li className='collection-item'>
                  <form className='nav-wrapper' onSubmit={this.handleSubmit}>
                    <div className="input-field">
                      <input id="search" type="search" onChange={this.handleSearch} value={this.state.search} />
                      <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                      <i className="material-icons">close</i>
                    </div>
                  </form>
                </li>
                <Group groups={this.state.groups} />
              </ul>
            </div>
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