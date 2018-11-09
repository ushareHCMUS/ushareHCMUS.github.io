import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import requestStatus from './requestStatus';
import authUser from '../routes/login/reducers';
import chartData from '../routes/app/routes/dashboard/reducers';
import registerUser from '../routes/sign-up/reducers';
import usersData from '../routes/app/routes/userlist/reducers';

const reducers = {
  routing: routerReducer,
  requestStatus,
  authUser,
  registerUser,
  chartData,
  usersData,
  settings,
};

export default  combineReducers(reducers);
