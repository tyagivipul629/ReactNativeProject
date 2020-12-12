import * as ActionTypes from './ActionTypes';

export const comments = (state = { isLoading: true, errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, isLoading: false, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMMENT:
      {
        if(state.comments.length===0)
          {
            action.payload.id=0;
            return {...state,comments: [...state.comments,action.payload]}
          } 
        else{
          action.payload.id= Math.max.apply(null,state.comments.map(comment=>comment.id))+1;
          return {...state,comments: [...state.comments,action.payload]}
        }
      }

    case ActionTypes.DELETE_COMMENT:
      return {...state,comments: state.comments.filter(comment=>comment.id!==action.payload)}

    case ActionTypes.EDIT_COMMENT:
      return {...state,comments: state.comments.filter(comment=>comment.id!==action.payload.id).concat(action.payload)}
    default:
      return state;
  }
};