import { REGISTER_SUCCESS } from '../actions/index';

function authUser(state = {}, action) {
  switch (action.type) {
    case REGISTER_SUCCESS: {
      return {};
    }
    default: {
      return state;
    }
  }
}

export default authUser;