import { SET_GROUP, ADD_USER, REMOVE_USER } from '../actions/group';

export default function group(state = null, action = {}) {
  switch (action.type) {
    case SET_GROUP:
      return action.group;
    case ADD_USER:
      return Object.assign({}, { users: [...state.users, action.user] });
    case REMOVE_USER:
      return Object.assign({}, { users: [...state.users].filter(u => u !== action.user) });
    default: return state;
  }
}
