import Auth from '../../../utils/Auth';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/index';

function authUser(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      let data = action.payload;

      const { token } = data.success;
      delete data['success'];
      data.token = token;

      Auth.setAuth(data);
      return data;
    }
    case LOGOUT_SUCCESS: {
      return {};
    }
    default: {
      return state;
    }
  }
}

export default authUser;