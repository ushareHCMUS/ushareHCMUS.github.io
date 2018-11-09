import LocalStorage from './LocalStorage';
import { USER_ROLE } from '../constants/Define';

const Auth = {
  getAuth() {
    return LocalStorage.getItem('auth');
  },

  setAuth(auth) {
    LocalStorage.setItem('auth', auth);
  },

  removeAuth() {
    LocalStorage.removeItem('auth');
  },

  loggedIn() {
    return !!LocalStorage.getItem('auth') && !!LocalStorage.getItem('auth').token;
  },

  token() {
    return LocalStorage.getItem('auth') ? LocalStorage.getItem('auth').token : null;
  },

  email() {
    return LocalStorage.getItem('auth') ? LocalStorage.getItem('auth').email : null;
  },

  isUser() {
    return LocalStorage.getItem('auth') && (LocalStorage.getItem('auth').role === USER_ROLE.USER);
  },

  isAdmin() {
    return LocalStorage.getItem('auth') && (LocalStorage.getItem('auth').role === USER_ROLE.ADMIN);
  },

  isManager() {
    return LocalStorage.getItem('auth') && (LocalStorage.getItem('auth').role === USER_ROLE.MANAGER);
  },
};

export default Auth;
