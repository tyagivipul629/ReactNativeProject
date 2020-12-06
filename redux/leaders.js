import * as ActionTypes from './ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';

export const leaders = (state  = { isLoading: true,
                                    errMess: null,
                                    leaders:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
        {   AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (error, stores) => {
              stores.map((result, i, store) => {
                console.log('log async: ',{ [store[i][0]]: store[i][1] });
                return true;
              });
            });
          });
            return {...state, isLoading: false, errMess: null, leaders: action.payload};}

        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []}

        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};