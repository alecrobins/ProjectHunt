import * as types from '../constants/uiConstants'

export default function uiReducer(
	state = {
		loginClicked: false
	} , action) {
	switch (action.type) {
		case types.LOGIN_CLICKED:
			return {
				...state,
				loginClicked: true
			}
		case types.LOGIN_WINDOW_CLOSED:
			return {
				...state,
				loginClicked: true
			}	
		default:
			return state;
	}
}