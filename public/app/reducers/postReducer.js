export default function postReducer(state = {
	postData: []
}, action) {
	switch (action.type) {
		case 'GET_POSTS':
			console.log("GOT POST@!");
			console.log(action.res);
			return {
				...state,
				postData: [...action.res.data]
			};
		case 'GET_POSTS_REQUEST':
			console.log("GET_POSTS_REQUEST");
			console.log(action);
			return state;
		case 'GET_POSTS_FAILURE':
			console.log("~~~GET_POSTS_FAILURE");
			console.log(action);	
			return state;
		default:
			return state;
	}
}
