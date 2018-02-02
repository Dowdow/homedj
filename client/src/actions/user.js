import socket from '../utils/socket';

export const SET_USER = 'SET_USER';

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function login(datas) {
  return (dispatch) => {
    socket.emit('login', datas);
    dispatch(setUser(null));
  };
}

export function waitLogin() {
  return (dispatch) => {
    socket.on('logged', (user) => {
      dispatch(setUser(user));
    });
  };
}
