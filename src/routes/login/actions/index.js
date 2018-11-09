export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';

export function login(payload, next) {
  return {
    type: LOGIN,
    payload,
    next
  };
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export function changePassword(data, success, fail) {
  return {
    type: CHANGE_PASSWORD,
    data,
    success,
    fail
  }
}