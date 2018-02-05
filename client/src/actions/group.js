import socket from '../utils/socket';

export const ADD_USER = 'ADD_USER';
export const SET_GROUP = 'SET_GROUP';
export const REMOVE_USER = 'REMOVE_USER';

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function setGroup(group) {
  return {
    type: SET_GROUP,
    group,
  };
}

export function removeUser(user) {
  return {
    type: REMOVE_USER,
    user,
  };
}

export function currentGroup(group) {
  return (dispatch) => {
    dispatch(setGroup(group));
  };
}

export function addUserToGroup(datas) {
  return (dispatch) => {
    socket.emit('addUserToGroup', datas);
  };
}

export function waitAddUserToGroup() {
  return (dispatch) => {
    socket.on('addUserToGroup', (user) => {
      dispatch(addUser(user));
    });
  };
}

export function removeUserFromGroup(datas) {
  return (dispatch) => {
    socket.emit('removeUserFromGroup', datas);
  };
}

export function waitRemoveUserFromGroup() {
  return (dispatch) => {
    socket.on('removeUserFromGroup', (user) => {
      dispatch(removeUser(user));
    });
  };
}
