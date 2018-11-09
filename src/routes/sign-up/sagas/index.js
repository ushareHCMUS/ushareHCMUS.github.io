import { take, call, put, fork } from 'redux-saga/effects';
import { register } from '../../../services/AuthAPI';
import { REGISTER, REGISTER_SUCCESS } from '../actions/';
import { START_REQUEST, STOP_REQUEST, REQUEST_ERROR } from '../../../constants/ActionTypes';

function* registerFlow() {
  const INFINITE = true;

  while (INFINITE) {
    const { payload, next } = yield take(REGISTER);
    try {
      yield put({ type: START_REQUEST });
      const response = yield call(register, payload);
      yield put({ type: STOP_REQUEST });

      if (response && !response.error) {
        yield put({ type: REGISTER_SUCCESS, payload: response.data });
        if (next && typeof next === 'function') {
          next();
        }
      }
    } catch (err) {
      yield put({ type: REQUEST_ERROR, payload: err.message || err });
    }
  }
}

export default function* authFlowRegister() {
  yield fork(registerFlow);
};