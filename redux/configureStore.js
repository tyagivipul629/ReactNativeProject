import {createStore, combineReducers, applyMiddleware} from 'redux';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leaders';
import { favorite } from './favorite.js';
import thunk from 'redux-thunk';
import { logger } from "redux-logger";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders,
            favorite
        }),
        applyMiddleware(thunk)
    );

    return store;
}