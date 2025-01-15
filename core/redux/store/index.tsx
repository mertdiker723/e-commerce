import { createStore, combineReducers } from 'redux';
import cartReducer from '../reducers/cart';

const rootReducer = combineReducers({
    cartReducer: cartReducer,
});

const store = createStore(rootReducer);


export default store;