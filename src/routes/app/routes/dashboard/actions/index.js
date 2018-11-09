export const GET_ALL_CHART_DATA = 'GET_ALL_CHART_DATA';
export const GET_ALL_CHART_DATA_SUCCESS = 'GET_ALL_CHART_DATA_SUCCESS';

export function getData(payload, success, fail) {
  return {
    type: GET_ALL_CHART_DATA,
    payload,
    success,
    fail
  }
}