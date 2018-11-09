import { post } from './FetchAPI';
import { DATA_API, USER_LIST_API, MANAGER_LIST_API, ADMIN_LIST_API, AREA_ZONE_API, PH_ZONE_API } from '../constants/Api';

//Area
export function getAreaZoneData() {
  return post(AREA_ZONE_API,{});
}

export function getAreaPHZoneData() {
  return post(PH_ZONE_API,{});
}

//Dashboard
export function getData(payload) {
  return post(DATA_API,payload);
}

//Userlist
export function getUser() {
  return post(USER_LIST_API,{});
}

export function getManager() {
  return post(MANAGER_LIST_API,{});
}

export function getAdmin() {
  return post(ADMIN_LIST_API,{});
}