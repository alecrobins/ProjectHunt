import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';

import { routeReducer } from 'redux-simple-router';
import postReducer from '../reducers/postReducer';
import authedReducer from '../reducers/authReducer';
import tagHintsReducer from '../reducers/tagHintsReducer';
import talentHintsReducer from '../reducers/talentHintsReducer';

let createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk)(createStore);

const reducer = combineReducers({
    routing: routeReducer, // keep track of routing
    posts: postReducer,
    user: authedReducer,
    tagHints: tagHintsReducer,
    talentHints: talentHintsReducer
})

const store = createStoreWithMiddleware(reducer);

export default store;