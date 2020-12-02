import * as ActionTypes from './ActionTypes.js';
export const favorite=(state=[],action)=>{
    switch(action.type){
        case ActionTypes.ADD_FAVORITE:
            if(state.includes(action.payload)) return state;
            else return state.concat(action.payload);
        case ActionTypes.REMOVE_FAVORITE:
            {return state.filter(elem=>elem!==action.payload)}
        default: return state;
    }
}