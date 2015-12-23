import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';
import { routeReducer } from 'redux-simple-router';

import reducer_1 from '../reducers/reducerTest';
import incrementTest from '../reducers/incrementTest';
import postReducer from '../reducers/postReducer';
import authedReducer from '../reducers/authReducer';

let createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk)(createStore);

const reducer = combineReducers({
    messages: reducer_1,
    count: incrementTest,
    routing: routeReducer, // keep track of routing
    posts: postReducer,
    user: authedReducer
})

const store = createStoreWithMiddleware(reducer);

export default store;