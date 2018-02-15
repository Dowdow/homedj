import { apiPost, apiDelete } from '../utils/api';

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

export function addUserToGroup(id, userId) {
  return async (dispatch) => {
    try {
      await apiPost(`group/${id}/user`, { user: userId });
      dispatch(addUser(userId));
    } catch (err) {
      console.log(err);
    }
  };
}

export function removeUserFromGroup(id, userId) {
  return async (dispatch) => {
    try {
      apiDelete(`group/${id}/user/${userId}`);
      dispatch(removeUser(userId));
    } catch (err) {
      console.log(err);
    }
  };
}
