import axios from 'axios';
import Auth from '../utils/Auth';

function getConfig(){
  if (Auth.loggedIn()) {
    return {
      headers: { 
        Authorization: 'Bearer ' + Auth.token()
      },
      crossdomain:true
    }
  }
  return{headers:{}};
}

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url,data,getConfig()).then((res) => {
      resolve(res);
    }).catch((err) => {
      const response = err.response || err;
      const data = response.data || response;
      const error = data.error || data;
      reject(error);

      if (error.statusCode === 401 && (error.code === 'INVALID_TOKEN' || error.code === 'AUTHORIZATION_REQUIRED')) {
        Auth.removeAuth();
      }
    })
  });
}

export function patch(url, data) {
  return new Promise((resolve, reject) => {
    axios.patch(url,data,getConfig()).then((res) => {
      resolve(res);
    }).catch((err) => {
      const response = err.response || err;
      const data = response.data || response;
      const error = data.error || data;
      reject(error);

      if (error.statusCode === 401 && (error.code === 'INVALID_TOKEN' || error.code === 'AUTHORIZATION_REQUIRED')) {
        Auth.removeAuth();
      }
    })
  });
}