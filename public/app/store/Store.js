import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routeReducer } from 'redux-simple-router';
import reducer_1 from '../reducers/reducerTest';
import incrementTest from '../reducers/incrementTest';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const reducer = combineReducers({
    messages: reducer_1,
    count: incrementTest,
    routing: routeReducer // keep track of routing
})

const store = createStoreWithMiddleware(reducer);

export default store;