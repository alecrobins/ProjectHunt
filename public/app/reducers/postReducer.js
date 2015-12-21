export default function postReducer(state = {
	postData: []
}, action) {
	switch (action.type) {
		case 'GET_POSTS':
			console.log("GOT POST@!");
			console.log(action.res.data);
			return {
				...state,
				postData: [...action.res.data]
			};
		default:
			return state;
	}
}
