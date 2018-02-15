import axios from 'axios';

export const HOSTNAME = window && window.location && window.location.hostname;

let HOST = `http://${HOSTNAME}`;

if (HOSTNAME === 'localhost') {
  HOST = `${HOST}:3000`;
}

export function apiGet(route, params) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
      const res = await axios.get(`${HOST}/${route}?${query}`, { withCredentials: true });
      if (res.status === 200) {
        resolve(res.data);
      } else {
        reject();
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function apiPost(route, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`${HOST}/${route}`, body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.status === 200) {
        resolve(res.data);
      } else {
        reject();
      }
    } catch (err) {
      reject(err);
    }
  });
}
