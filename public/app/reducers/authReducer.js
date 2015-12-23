import * as types from '../constants/authedConstants'

export default function authedReducer(
	state = {
		userData: {},
		is_logged_in: false
	} , action) {
	switch (action.type) {
		case types.GET_USER:
			console.log("GOT USER@!");
			console.log(action.res.data);
			return {
				...state,
				userData: {...action.res.data},
				is_logged_in: true
			};
		case `${types.GET_USER}_FAILURE`:
			console.log("FAILED Logged in");
			return {
				...state,
				is_logged_in: false
			};
		default:
			return state;
	}
}