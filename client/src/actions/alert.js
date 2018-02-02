import socket from '../utils/socket';

export const SET_ALERT = 'SET_ALERT';

export function setAlert(message) {
  return {
    type: SET_ALERT,
    message,
  };
}

export function throwAlert(datas) {
  return (dispatch) => {
    socket.emit('login', datas);
    dispatch(setAlert(null));
  };
}

export function waitAlert() {
  return (dispatch) => {
    socket.on('error', (message) => {
      dispatch(setAlert(message));
    });
  };
}
