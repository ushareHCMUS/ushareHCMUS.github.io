import { GET_ADMIN_SUCCESS, GET_MANAGER_SUCCESS, GET_USER_SUCCESS } from '../actions/';
import Auth from '../../../../../utils/Auth';

function authUser(state = {}, action) {
  switch (action.type) {
    case GET_ADMIN_SUCCESS: {
      action.payload = action.payload.filter((item) => item.email != Auth.email());

      action.payload = action.payload.map(item => {
        return {
          ...item,
          role:'Admin'
        }
      });
      return {
        ...state,
        admin:action.payload
      };
    }
    case GET_MANAGER_SUCCESS: {
      action.payload = action.payload.map(item => {
        return {
          ...item,
          role:'Manager'
        }
      });
      return {
        ...state,
        manager:action.payload
      };
    }
    case GET_USER_SUCCESS: {
      action.payload = action.payload.map(item => {
        return {
          ...item,
          role:'User'
        }
      });
      return {
        ...state,
        user:action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export default authUser;