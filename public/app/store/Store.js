import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';
import { routeReducer } from 'redux-simple-router';
import reducer_1 from '../reducers/reducerTest';
import incrementTest from '../reducers/incrementTest';
import postReducer from '../reducers/postReducer';

// let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

const reducer = combineReducers({
    messages: reducer_1,
    count: incrementTest,
    routing: routeReducer, // keep track of routing
    posts: postReducer
})

const store = createStoreWithMiddleware(reducer);

export default store;