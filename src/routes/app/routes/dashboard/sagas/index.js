import { take, call, put, fork } from 'redux-saga/effects';
import { getData } from '../../../../../services/DataAPI';
import { GET_ALL_CHART_DATA, GET_ALL_CHART_DATA_SUCCESS } from '../actions/';
import { START_REQUEST, STOP_REQUEST, REQUEST_ERROR } from '../../../../../constants/ActionTypes';

function* chartData() {
  const INFINITE = true;

  while (INFINITE) {
    const { payload, success, fail  } = yield take(GET_ALL_CHART_DATA);
    try {
      yield put({ type: START_REQUEST });
      const response = yield call(getData, payload);

      yield put({ type: STOP_REQUEST });

      if (response && !response.error) {
        yield put({ type: GET_ALL_CHART_DATA_SUCCESS, payload: response.data });
        if(success && typeof success == 'function') {
          success();
        }
      }
    } catch (err) {
      yield put({ type: REQUEST_ERROR, payload: err.message || err });
      if(fail && typeof fail == 'function') {
        fail();
      }
    }
  }
}

export default function* authFlow() {
  yield fork(chartData);
};