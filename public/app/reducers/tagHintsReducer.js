export default function tagHintsReducer(
	state = [] , action) {
	switch (action.type) {
		case 'GET_TAG_HINT':
			return [...action.res.data];
		case 'GET_TAG_HINT_FAILED':
			return [];
		default:
			return state;
	}
}