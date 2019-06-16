export const changeRoomBookingStatus = (bookingId ,bookingData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var batch = firestore.batch();

    batch.update(firestore.collection('room_booking').doc(bookingId), {
      status: bookingData.status,
    });
    batch.commit().then(() => {
      dispatch({ type: 'CHANGE_ROOM_BOOKING_STATUS' });
    }).catch((err) => {
      dispatch({ type: 'CHANGE_ROOM_BOOKING_STATUS_ERROR', err });
    })
  }
}

function createRandomString( length ) {
  var str = "";
  for ( ; str.length < length; str += Math.random().toString( 36 ).substr( 2 ) );
  return str.substr( 0, length );
}

export const addRoomBookingNoti = (notiData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var batch = firestore.batch();
    batch.set(firestore.collection('room_booking_noti').doc(createRandomString(20)), {
      ...notiData,
      timeStamp: firestore.FieldValue.serverTimestamp(),
      date: firestore.FieldValue.serverTimestamp(),
    });

    batch.commit().then(() => {
      dispatch({ type: 'ADD_BOOKING_NOTI'});
    }).catch((err) => {
      dispatch({ type: 'ADD_BOOKING_NOTI_ERROR', err });
    })
  }
}

export const changeRemoveStatus = () => {
  return (dispatch) => {
    dispatch({type:'CHANGE_REMOVE_STATUS'});
  }
}

export const changeAddStatus = () => {
  return (dispatch) => {
    dispatch({type:'CHANGE_ADD_STATUS'});
  }
}