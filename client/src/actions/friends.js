import socket from '../utils/socket';

export const SET_FRIENDS = 'SET_FRIENDS';

export function setFriends(friends) {
  return {
    type: SET_FRIENDS,
    friends,
  };
}

export function getFriends() {
  return (dispatch) => {
    socket.emit('getFriends');
    dispatch(setFriends([]));
  };
}

export function waitGetFriends() {
  return (dispatch) => {
    socket.on('getFriends', (friends) => {
      dispatch(setFriends(friends));
    });
  };
}
