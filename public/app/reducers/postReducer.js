import * as types from '../constants/postConstants'

export default function postReducer(state = {
	postData: []
}, action) {
	switch (action.type) {
		case types.GET_POSTS:
			return {
				...state,
				postData: [...action.res.data]
			};
		case `${types.GET_POSTS}_REQUEST`:
			return state;
		case `${types.GET_POSTS}_FAILURE`:
			return state;
		case types.CREATE_POST:
			console.log("Succesfully posted");
			// TODO: dispatch command that post was
			// created succefully
			return state;
		case `${types.CREATE_POST}_FAILURE`:
			console.log("Failed posting post");
			// TODO: need to dispatch a toastr signalling 
			// what went wrong
			return state;
		case types.LIKE_POST:
			console.log("Succesfully liked the post!!!");
			console.log(action);
			return state;
		case `${types.LIKE_POST}_FAILURE`:
			console.log("FAILED liking the post");
			console.log(action);
			return state;
		default:
			return state;
	}
}
