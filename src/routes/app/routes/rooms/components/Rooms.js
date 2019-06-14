import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PageLoading from '../../../../../components/PageLoading/';
import QueueAnim from 'rc-queue-anim';
import { Redirect } from 'react-router-dom';
// import AddMemberDialog from './AddMemberDialog';
import { Link } from 'react-router-dom';
import { 
  Paper, 
  IconButton,
  DatePicker,
  TimePicker,
  TextField,
RaisedButton,
Popover,
Menu,
MenuItem
  
} from 'material-ui';
import ImportantIcon from 'material-ui/svg-icons/toggle/star';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { blue600, red600 } from 'material-ui/styles/colors';
import AddUserDialog from '../../../../../components/Dialogs/AddUserDialog';
import PopupDialog from '../../../../../components/Dialogs/PopupDialog';


class Rooms extends Component {
  constructor(props) {
    super(props);

    this.handleRoomSearch = this.handleRoomSearch.bind(this)
    this.renderRooms = this.renderRooms.bind(this)
    
    this.state = {
      roomSearch: ''
    };
  }

  handleRoomSearch(e) {
    const roomSearch = e.currentTarget.value;
    this.setState({ roomSearch: roomSearch });
  }

  renderRooms(oriBlocks) {
    //deep copy objects
    let blocks = JSON.parse(JSON.stringify(oriBlocks))

    if(this.state.roomSearch.trim() != '') {
      Object.keys(blocks).filter((block) => {
        blocks[block].rooms = blocks[block].rooms.filter((room) => {
          return room.idRoom.toLowerCase().includes(this.state.roomSearch.toLowerCase())
        })

        return true;
      })
    }

    return (
      Object.keys(blocks).map((blockId, index) => (
        <Paper className='d-flex flex-column col-3' key={index}>
          {'Dãy ' + blockId}
          {
            blocks[blockId].rooms.map((room) => (
              <div>
                {room.idRoom}
              </div>
            ))
          }
        </Paper>
      ))
    );
  }

  render() {
    let { blocks, bookingInfo, bookingNoti, bookingStatus } = this.props;
    return !blocks ? 
      (<PageLoading open={true}/>)
      :
      (<QueueAnim type="bottom" className="container ui-animate">
        <Paper key="1" className='d-flex flex-row align-items-center' style={{ padding:'10px', marginBottom:'15px', borderBottom:'1px solid #E0E0E0'}}>
          <DatePicker/>
          <TimePicker/>
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
        </Paper>
        <div key="2" className='d-flex flex-row justify-content-between'>
          {this.renderRooms(blocks)}
        </div>  
      </QueueAnim>)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    blocks: state.firestore.data.rooms,
    bookingInfo: state.firestore.data.room_booking,
    bookingNoti: state.firestore.data.room_booking_noti,
    bookingStatus: 'rejected'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // removeMember: (member, group) => dispatch(removeMember(member, group)),
    // changeRemoveStatus: () => dispatch(changeRemoveStatus()),
    // addMember: (member, group) => dispatch(addMember(member, group)),
    // changeAddStatus: () => dispatch(changeAddStatus())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'rooms' },
    { collection: 'room_booking' },
    { collection: 'room_booking_noti' }
  ])
)(Rooms);