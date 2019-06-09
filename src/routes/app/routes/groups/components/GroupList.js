import React, { Component } from 'react';
import Group from './Group';
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

class GroupList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      search: '',
      groups: null,
      menuOpen: false,
      addUserDialogOpen: true,
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

  componentDidMount() {
    if(this.props.groups) {
      this.changeState(this.props.groups);
    }
  }

  render() {
    const { groups, auth } = this.props;
    
    if(!auth.uid && !auth) return <Redirect to='/login'></Redirect>
    if (groups) {
      return (
        <QueueAnim type="bottom" className="ui-animate">
            {/* <div className='container' key="1">
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
            </div> */}
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
                // onChange={this.searchHandler}
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
            </Paper>

            <Paper key="2">

            </Paper>
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