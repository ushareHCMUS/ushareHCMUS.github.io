const initState = {
    addStatus: null,
    removeStatus: null,
    updateStatus: null,
    editStatus: null
  }
  
  const newsReducer = (state = initState, action) => {
    switch (action.type) {
      case 'ADD_NEWS':
        state.addStatus = "Success";
        return state;
      case 'ADD_NEWS_ERROR':
        state.addStatus = action.err;
        return state;
      case 'CHANGE_ADD_STATUS':
        state.addStatus = null;
        return state;
      case 'EDIT_NEWS':
        state.editStatus = "Success";
        return state;
      case 'EDIT_NEWS_ERROR':
        state.editStatus = action.err;
        return state;
      case 'CHANGE_EDIT_STATUS':
        state.editStatus = null;
        return state;
      default:
        return state;
    }
  };
  
  export default newsReducer;