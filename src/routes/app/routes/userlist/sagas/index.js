import { take, all, call, put, fork } from 'redux-saga/effects';
import { getAdmin, getManager, getUser } from '../../../../../services/DataAPI';
import { GET_USERS, GET_ADMIN_SUCCESS, GET_MANAGER_SUCCESS, GET_USER_SUCCESS } from '../actions/';
import { START_REQUEST, STOP_REQUEST, REQUEST_ERROR } from '../../../../../constants/ActionTypes';

function* userList() {
  const INFINITE = true;

  while (INFINITE) {
    const { success, fail } = yield take(GET_USERS);
    try {
      yield put({ type: START_REQUEST });
      const response = yield all([
        call(getAdmin),
        call(getUser),
        call(getManager)
      ]);
      yield put({ type: STOP_REQUEST });

      if (response && response[0] && !response[0].error) {
        yield put({ type: GET_ADMIN_SUCCESS, payload: response[0].data });
        yield put({ type: GET_MANAGER_SUCCESS, payload: response[1].data });
        yield put({ type: GET_USER_SUCCESS, payload: response[2].data });
        yield put({ type: STOP_REQUEST });
        if (success && typeof success === 'function') {
          success();
        }
      } else {
        fail();
      }
    } catch (err) {
      yield put({ type: REQUEST_ERROR, payload: err.message || err });
      if (fail && typeof fail === 'function') {
        fail();
      }
    }
  }
}

export default function* userListFlow() {
  yield fork(userList);
};