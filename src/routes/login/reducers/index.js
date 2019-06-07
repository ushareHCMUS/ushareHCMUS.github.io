import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_ERROR } from '../actions/';

const initState = {
  authError: null,
  uid: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return {
        ...state,
        authError: action.err.code,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null
      };
    case LOGOUT_SUCCESS:
      return state;
    case LOGOUT_ERROR:
      return state;

    default: 
      return state;
  }
}

export default authReducer