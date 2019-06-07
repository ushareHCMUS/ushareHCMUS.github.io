const initState = {
    addStatus: null,
    removeStatus: null
  }
  
  const groupReducer = (state = initState, action) => {
    switch (action.type) {
      case 'ADD_MEMBER':
        state.addStatus = "Success";
        return state;
      case 'ADD_MEMBER_ERROR':
        state.addStatus = action.err;
        return state;
      case 'REMOVE_MEMBER':
        state.removeStatus = "Success";
        return state;
      case 'REMOVE_MEMBER_ERROR':
        state.removeStatus = action.err;
        return state;
      case 'CHANGE_REMOVE_STATUS':
        state.removeStatus = null;
        return state;
      case 'CHANGE_ADD_STATUS':
        state.addStatus = null;
        return state;
      default:
        return state;
    }
  };
  
  export default groupReducer;