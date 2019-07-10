import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PageLoading from '../../../../../components/PageLoading/';
import QueueAnim from 'rc-queue-anim';
import { 
  Paper, 
  FlatButton,
} from 'material-ui';
import { addRoomBookingNoti, changeRoomBookingStatus } from '../actions/';
import { formatUrlDateString } from '../../../../../utils/helper';
import DeclineDialog from './DeclineDialog';

class Rooms extends Component {
  constructor(props) {
    super(props);

    this.handleRoomSearch = this.handleRoomSearch.bind(this)
    this.renderRooms = this.renderRooms.bind(this)
    
    this.state = {
      roomSearch: '',
      declineDialogOpen: false,
      declineReason: '',
      declineData: {},
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
        <RoomItem
          blockName={blockId}
          blockData={blocks[blockId]}
        />)
      )
    );
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
      addingRole: menuItem.key
    });
  }
  
  mapShift(shift) {
    switch(shift) {
      case 1:
        return '07:00 - 08:30';
      case 2: 
        return '08:45 - 10:15';
      case 3: 
        return '10:30 - 12:00';
      case 4: 
        return '13:00 - 14:30';
      case 5: 
        return '14:45 - 16:15';
      case 6: 
        return '16:30 - 18:00';
    }
  }

  renderBookingInfo(bookingInfo) {
    return Object.keys(bookingInfo).map(info => {
      if(bookingInfo[info].status == '0') {
        let tmp = JSON.parse(JSON.stringify(bookingInfo[info]));
        tmp.status = 1;
        return <Paper className="card">
          <div className="card-header text-muted" style={{backgroundColor: (bookingInfo[info].status == '0' ? 'red' : 'blue')}}>
          </div>
          <div className="card-body d-flex flex-row">
            <div className="col-10">
              <h5>Mục đích : {bookingInfo[info].content}</h5>
              <h5>Phòng : {bookingInfo[info].idRoom}</h5>
              <h5>Thời gian : {this.mapShift(bookingInfo[info].shift)}</h5>
              <h5>Ngày : {formatUrlDateString(bookingInfo[info].date.seconds * 1000)}</h5>
            </div>
            <div className="col-2 d-flex flex-column align-items-center justify-content-center">
              <FlatButton
                label="Chấp nhận"
                primary
                onClick={(e) => {
                  this.props.changeRoomBookingStatus(info, tmp);
                  let tmp1 = JSON.parse(JSON.stringify(tmp));
                  delete tmp1.content;
                  tmp1.date = tmp.date;
                  tmp1.status = 1;
                  tmp1.success = true;
                  tmp1.message = "BQT đã chấp nhận yêu cầu đặt phòng của bạn";
                  this.props.addRoomBookingNoti(tmp1);
                }}
              />
              <FlatButton
                label="Từ chối"
                onClick={(e) => {
                  let tmp1 = JSON.parse(JSON.stringify(tmp));
                  tmp1.success = true;
                  tmp1.status = -1;
                  tmp1.message = "Yêu cầu đặt phòng bị từ chối, Lý do: ";
                  tmp1.info = info;
                  this.setState({ 
                    declineDialogOpen: true,
                    declineData: tmp1
                  });
                }}
                style={{backgroundColor:'red', color:'white'}}
              />
            </div>
          </div>
        </Paper>
      }
    });
    
  }

  render() {
    let { blocks, bookingInfo, bookingNoti, bookingStatus } = this.props;
    if(bookingInfo != undefined) {
      return (bookingInfo.length == 0 ? 
        (<PageLoading open={true}/>)
        :
        (<QueueAnim type="bottom" className="container ui-animate">
          <Paper>
            <h4 style={{padding:'14px 20px'}}>Yêu cầu đặt phòng</h4>
          </Paper>
          <div key="1">
            {this.renderBookingInfo(bookingInfo)}
          </div>  
          <DeclineDialog
            open={this.state.declineDialogOpen}
            decline={(reason) => {
              let data = JSON.parse(JSON.stringify(this.state.declineData));
              data.message += reason;
              data.success = false;

              const id = data.info;
              delete data.info

              this.props.addRoomBookingNoti(data);
              this.props.changeRoomBookingStatus(id, data);
            }}
            handleClose={(e) => {
              this.setState({
                declineDialogOpen: false
              })
            }}/>
        </QueueAnim>)
      )
    } else {
      return <div/>
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    blocks: state.firestore.data.rooms,
    bookingInfo: state.firestore.data.room_booking,
    bookingNoti: state.firestore.data.room_booking_noti,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRoomBookingNoti: (bookingData) => dispatch(addRoomBookingNoti(bookingData)),
    changeRoomBookingStatus: (bookingId, bookingData) => dispatch(changeRoomBookingStatus(bookingId, bookingData))
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