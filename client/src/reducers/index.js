import { combineReducers } from 'redux';
import alert from '../reducers/alert';
import group from '../reducers/group';
import groups from '../reducers/groups';
import user from '../reducers/user';

const homedjReducer = combineReducers({
  alert,
  group,
  groups,
  user,
});

export default homedjReducer;
