const defaultState = {
	title: "",
	tag_line: "",
	description: "",
	imgs: [],
	tags: [],
	talent_needed: []
}

export default function formReducer(
	state = defaultState, action) {
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
		case 'ADD_TEMP_TAG':
			return {
				...state,
				tags: [...state.tags, action.tag]
			}
		case 'REMOVE_TEMP_TAG':
			var {index} = action;
			return {
				...state,
				tags: [...state.tags.slice(0, index), ...state.tags.slice(index+1)]
			};
		case 'ADD_TEMP_TALENT':
			return {
				...state,
				talent_needed: [...state.talent_needed, action.talent]
			}
		case 'REMOVE_TEMP_TALENT':
			var {index} = action;
			return {
				...state,
				talent_needed: [...state.talent_needed.slice(0, index), ...state.talent_needed.slice(index+1)]
			};
		case 'REST_FORM_STATE':
			return defaultState;
		default:
			return state;
	}
}