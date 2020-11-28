import {createStore, combineReducers, applyMiddleware} from 'redux';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leaders';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders
        }),
        applyMiddleware(thunk)
    );

    return store;
}