const initState = {
  acceptStatus: null,
  rejectStatus: null
}

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case 'REMOVE_STUDENT':
      return state;
    case 'REJECT_BOOKING':
      return state;
    default:
      return state;
  }
};

export default usersReducer;