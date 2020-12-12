import * as ActionTypes from './ActionTypes';

export const users = (state = { errMess: null, users:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USERS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.USERS_FAILED:
      return {...state, errMess: action.payload};

    default:
      return state;
  }
};