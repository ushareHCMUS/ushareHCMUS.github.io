export const GET_USERS = 'GET_USERS';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_ADMIN_SUCCESS = 'GET_ADMIN_SUCCESS';
export const GET_MANAGER_SUCCESS = 'GET_MANAGER_SUCCESS';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const ACTIVE_USER = 'ACTIVE_USER';
export const ACTIVE_USER_SUCCESS = 'ACTIVE_USER_SUCCESS';
export const DEACTIVE_USER = 'DEACTIVE_USER';
export const DEACTIVE_USER_SUCCESS = 'DEACTIVE_USER_SUCCESS';

export function getUsers(success, fail) {
  return {
    type : GET_USERS,
    success,
    fail
  }
}

export function registerUser(data, success, fail) {
  return {
    type : REGISTER_USER,
    data,
    success,
    fail 
  }
}

export function activeUser(id, success, fail) {
  return {
    type : ACTIVE_USER,
    id,
    success,
    fail 
  }
}

export function deactiveUser(id, success, fail) {
  return {
    type : DEACTIVE_USER,
    id,
    success,
    fail 
  }
}