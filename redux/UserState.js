import * as ActionTypes from './ActionTypes.js';

export const UserState=(state={
    isLoggedIn: false,
    username: null
}, action)=>{
    switch(action.type){
        case ActionTypes.LOGIN_USER:
            return {...state, isLoggedIn: true, username: action.payload}
        case ActionTypes.LOGOUT_USER:
            return {...state,isLoggedIn: false, username: null}
        default:
            return state
    }
}