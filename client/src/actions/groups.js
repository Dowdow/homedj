import socket from '../utils/socket';
import { setGroup } from './group';

export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const SET_GROUPS = 'SET_GROUPS';

export function addGroup(group) {
  return {
    type: ADD_GROUP,
    group,
  };
}

export function setGroups(groups) {
  return {
    type: SET_GROUPS,
    groups,
  };
}

export function getGroups() {
  return (dispatch) => {
    socket.emit('getGroups');
    dispatch(setGroups([]));
  };
}

export function waitGroups() {
  return (dispatch) => {
    socket.on('getGroups', (groups) => {
      dispatch(setGroups(groups));
    });
  };
}

export function createGroup() {
  return (dispatch) => {
    socket.emit('createGroup', { name: '' });
  };
}

export function waitCreateGroup() {
  return (dispatch) => {
    socket.on('createGroup', (group) => {
      dispatch(addGroup(group));
      dispatch(setGroup(group));
    });
  };
}

export function deleteGroup(group) {
  return (dispatch) => {
    socket.emit('deleteGroup', group);
  };
}

export function waitDeleteGroup() {
  return (dispatch) => {
    socket.on('deleteGroup', () => {
      dispatch(setGroup(null));
    });
  };
}
