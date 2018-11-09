import { post } from './FetchAPI';
import { LOGIN_API, LOGOUT_API, REGISTER_API, CHANGE_PASSWORD_API } from '../constants/Api';

export function login(payload) {
  return post(LOGIN_API, payload);
}

export function logout() {
  return post(LOGOUT_API, {});
}

export function register(payload) {
  return post(REGISTER_API, payload);
}

export function changePassword(payload) {
  return post(CHANGE_PASSWORD_API, payload);
}