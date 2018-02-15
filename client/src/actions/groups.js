import { apiGet, apiPost, apiDelete } from '../utils/api';
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
  return async (dispatch) => {
    try {
      const friends = await apiGet('groups', []);
      dispatch(setGroups(friends));
    } catch (err) {
      dispatch(setGroups([]));
    }
  };
}

export function createGroup(name) {
  return async (dispatch) => {
    try {
      const group = await apiPost('group', { name });
      dispatch(addGroup(group));
      dispatch(setGroup(group));
    } catch (err) {
      dispatch(setGroup(null));
    }
  };
}

export function deleteGroup(group) {
  return async (dispatch) => {
    try {
      await apiDelete(`group/${group._id}`);
      dispatch(setGroup(null));
    } catch (err) {
      dispatch(setGroup(group));
    }
  };
}
