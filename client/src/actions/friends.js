import { apiGet } from '../utils/api';

export const SET_FRIENDS = 'SET_FRIENDS';

export function setFriends(friends) {
  return {
    type: SET_FRIENDS,
    friends,
  };
}

export function getFriends() {
  return async (dispatch) => {
    try {
      const friends = await apiGet('friends', []);
      dispatch(setFriends(friends));
    } catch (err) {
      dispatch(setFriends([]));
    }
  };
}
