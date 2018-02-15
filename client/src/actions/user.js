import { apiPost } from '../utils/api';

export const SET_USER = 'SET_USER';

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function login(datas) {
  return async (dispatch) => {
    try {
      const user = await apiPost('login', datas);
      dispatch(setUser(user));
    } catch (err) {
      dispatch(setUser(null));
    }
  };
}
