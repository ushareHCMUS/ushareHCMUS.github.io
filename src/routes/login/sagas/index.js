import { take, call, put, fork } from 'redux-saga/effects';
import { login, logout, changePassword } from '../../../services/AuthAPI';
import { LOGIN, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS, CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS } from '../actions/';
import { START_REQUEST, STOP_REQUEST, REQUEST_ERROR } from '../../../constants/ActionTypes';

function* loginFlow() {
  const INFINITE = true;

  while (INFINITE) {
    const { payload, next } = yield take(LOGIN);
    try {
      yield put({ type: START_REQUEST });
      const response = yield call(login, payload);
      yield put({ type: STOP_REQUEST });

      if (response && !response.error) {
        yield put({ type: LOGIN_SUCCESS, payload: response.data });
        if (next && typeof next === 'function') {
          next();
        }
      }
    } catch (err) {
      yield put({ type: REQUEST_ERROR, payload: err.message || err });
    }
  }
}

function* logoutFlow() {
  const INFINITE = true;

  while (INFINITE) {
    const { payload } = yield take(LOGOUT);
    try {
      yield put({ type: START_REQUEST });
      const response = yield call(logout, payload);
      yield put({ type: STOP_REQUEST });

      if (response && !response.error) {
        yield put({ type: LOGOUT_SUCCESS, payload: response.data });
      }
    } catch (err) {
      yield put({ type: REQUEST_ERROR, payload: err.message || err });
    }
  }
}

function* changePasswordFlow() {
  const INFINITE  = true;

  while(INFINITE) {
    const { payload, success, fail } = yield take(CHANGE_PASSWORD);
    try {
      yield put({ type: START_REQUEST });
      const response = yield call(changePassword, payload);
      yield put({ type: STOP_REQUEST });

      if (response && !response.error) {
        yield put({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data });
        if (success && typeof success === 'function') {
          success();
        }
      }
    } catch (err) {
      yield put({ type: REQUEST_ERROR, payload: err.message || err });
      if (fail && typeof fail === 'function') {
        fail();
      }
    }
  }
}

export default function* authFlow() {
  yield fork(loginFlow);
  yield fork(logoutFlow);
  yield fork(changePasswordFlow);
};