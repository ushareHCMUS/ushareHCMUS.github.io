const initState = {
  authError: null,
  uid: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: action.err.code
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null
      };
    case 'SIGNOUT_SUCCESS':
      return state;
    default: 
      return state;
  }
}

export default authReducer