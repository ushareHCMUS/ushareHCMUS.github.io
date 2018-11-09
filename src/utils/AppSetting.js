import LocalStorage from './LocalStorage';

const AppSetting = {
  get: key => LocalStorage.getItem(key),
  set: (key, value) => LocalStorage.setItem(key, value),
};

export default AppSetting;
