export const GET_USERS = 'GET_USERS';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_ADMIN_SUCCESS = 'GET_ADMIN_SUCCESS';
export const GET_MANAGER_SUCCESS = 'GET_MANAGER_SUCCESS';

export function getUsers(success, fail) {
  return {
    type : GET_USERS,
    success,
    fail
  }
}