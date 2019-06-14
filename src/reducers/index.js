import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import requestStatus from './requestStatus';
import authUser from '../routes/login/reducers';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import group from '../routes/app/routes/groups/reducers/';
import news from '../routes/app/routes/news/reducers/';
import room from '../routes/app/routes/rooms/reducers/';

const reducers = {
  routing: routerReducer,
  requestStatus,
  authUser,
  settings,
  group,
  news,
  room,
  firestore: firestoreReducer,
  firebase: firebaseReducer
};

export default  combineReducers(reducers);
