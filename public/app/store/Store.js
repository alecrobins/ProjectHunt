import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const reducer_1 = (state = {}, action) => {
	console.log("Reduce_1");

	switch (action.type) {
		case 'SAY_SOMETHING':
			console.log("Actions", action);
			return {
				...state, // return all of the previous state
				message: action.value // changes the most recente
			}
		default:
			return state;
	}
}

const reducer_2 = (state = {}, action) => {
	console.log("Reducer 2");
	switch (action.type) {
		case 'DO_SOMETHING':
			return {
				...state, // return all of the previous state
				pizza: action.value // changes the most recente
			}
		default:
			return state;
	}
}

const reducer = combineReducers({
    messages: reducer_1,
    pizzas: reducer_2
})

const store = createStoreWithMiddleware(reducer);

export default store;