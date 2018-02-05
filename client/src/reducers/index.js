import { combineReducers } from 'redux';
import alert from '../reducers/alert';
import friends from '../reducers/friends';
import group from '../reducers/group';
import groups from '../reducers/groups';
import user from '../reducers/user';

const homedjReducer = combineReducers({
  alert,
  friends,
  group,
  groups,
  user,
});

export default homedjReducer;
