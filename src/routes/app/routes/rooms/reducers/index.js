const initState = {
  acceptStatus: null,
  rejectStatus: null
}

const roomReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ACCEPT_BOOKING':
      state.bookingStatus = "accept";
      return state;
    case 'REJECT_BOOKING':
      state.bookingStatus = "Reject"
    default:
      state.bookingStatus = undefined
      return state;
  }
};

export default roomReducer;