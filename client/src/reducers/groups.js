import { SET_GROUPS } from '../actions/groups';

export default function groups(state = [], action = {}) {
  switch (action.type) {
    case SET_GROUPS:
      return action.groups;
    default: return state;
  }
}
