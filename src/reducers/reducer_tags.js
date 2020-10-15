import {SET_TAGS} from "../actions/actions";

export default function(state = [], action) {
  switch (action.type) {
    case SET_TAGS:
    return action.payload.content;
    default:
      return state;
  }
}