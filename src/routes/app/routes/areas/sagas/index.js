import { take, all, call, put, fork } from 'redux-saga/effects';
import { getAreaZoneData, getAreaPHZoneData } from '../../../../../services/DataAPI';
import { GET_AREA_DATA, GET_ZONE_DATA_SUCCESS, GET_PH_ZONE_DATA_SUCCESS } from '../actions/';
import { START_REQUEST, STOP_REQUEST, REQUEST_ERROR } from '../../../../../constants/ActionTypes';

function* areaData() {
  const INFINITE = true;

  while (INFINITE) {
    const { payload, next } = yield take(GET_AREA_DATA);
    try {
      yield put({ type: START_REQUEST });
      const response = yield all([
        call(getAreaZoneData),
        call(getAreaPHZoneData)
      ]);
      yield put({ type: STOP_REQUEST });

      if (response[0] && !response[0].error) {
        yield put({ type: GET_ZONE_DATA_SUCCESS, payload: response[0].data });
        yield put({ type: GET_PH_ZONE_DATA_SUCCESS, payload: response[1].data });
        yield put({ type: STOP_REQUEST });
        if(next && typeof next == 'function') {
          next();
        }
      }
    } catch (err) {
      yield put({ type: REQUEST_ERROR, payload: err.message || err });
    }
  }
}

export default function* areaFlow() {
  yield fork(areaData);
};