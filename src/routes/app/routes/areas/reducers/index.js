import { GET_ZONE_DATA_SUCCESS, GET_PH_ZONE_DATA_SUCCESS } from '../actions/';

function authUser(state = {}, action) {
  switch (action.type) {
    case GET_ZONE_DATA_SUCCESS: {
      return {
        ...state,
        zone_data:action.payload
      };
    }
    case GET_PH_ZONE_DATA_SUCCESS: {
      return {
        ...state,
        ph_zone_data:action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export default authUser;