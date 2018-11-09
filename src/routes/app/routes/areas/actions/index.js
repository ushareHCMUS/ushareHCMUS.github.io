export const GET_AREA_DATA = 'GET_AREA_DATA';
export const GET_ZONE_DATA_SUCCESS = 'GET_ZONE_DATA_SUCCESS';
export const GET_PH_ZONE_DATA_SUCCESS = 'GET_PH_ZONE_DATA_SUCCESS';

export function getAreaData(next) {
  return {
    type: GET_AREA_DATA,
    next
  }
}