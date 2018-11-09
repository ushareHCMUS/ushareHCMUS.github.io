import MemoryStorage from 'memorystorage';

let store = window.localStorage;

if(typeof store == 'object'){
  try {
    store.setItem('store', 1);
    store.removeItem('store');
  } catch (e) {
    store = new MemoryStorage('bosgaurus');
    alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
  }
}

const LocalStorage = {
  setItem: (name, value) => {
    store.setItem(name, JSON.stringify(value));
  },
  getItem: (name) => {
    let value = {};
    try {
      value = JSON.parse(store.getItem(name));
    } catch (error) {
      value = store.getItem(name);
    }
    return value;
  },
  removeItem: (name) => {
    store.removeItem(name);
  },
};

export default LocalStorage;
