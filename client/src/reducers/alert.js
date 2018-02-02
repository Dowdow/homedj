import { SET_ALERT } from '../actions/alert';

export default function alert(state = null, action = {}) {
  switch (action.type) {
    case SET_ALERT:
      return action.message;
    default: return state;
  }
}
