export default function reducer_1(state = {}, action) {
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
