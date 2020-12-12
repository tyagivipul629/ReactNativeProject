import {createStore, applyMiddleware, combineReducers} from 'redux';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leaders';
import { favorite } from './favorite.js';
import { UserState } from './UserState.js';
import thunk from 'redux-thunk';
import { logger } from "redux-logger";
import { persistStore, persistCombineReducers, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const config = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['dishes','comments','promotions','leaders','favorite','UserState']
  }

export const ConfigureStore = () => {
    const store = createStore(
        persistReducer(config,combineReducers({
            dishes: dishes,
            comments: comments,
            promotions: promotions,
            leaders: leaders,
            favorite: favorite,
            UserState: UserState
        })),
        applyMiddleware(thunk)
    );

    const persistor = persistStore(store)
    return {persistor, store};
}