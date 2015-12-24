export default function formReducer(
	state = {
			tags: [],
			talent_needed: []
		}, action) {
	switch (action.type) {
		case 'SET_USER_TYPING':
			return {
				...state,
				userIsTyping: action.isTyping
			}
		case 'SET_TEMP_POST_DATA':
			return {
				...state,
				...action.formData
			}
		default:
			return state;
	}
}