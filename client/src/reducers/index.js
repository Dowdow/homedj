import { combineReducers } from 'redux';
import friends from '../reducers/friends';
import group from '../reducers/group';
import groups from '../reducers/groups';
import user from '../reducers/user';

const homedjReducer = combineReducers({
  friends,
  group,
  groups,
  user,
});

export default homedjReducer;
