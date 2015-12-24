export default function talentHintsReducer(
	state = [] , action) {
	switch (action.type) {
		case 'GET_TALENT_HINT':
			return [...action.res.data];
		case 'GET_TALENT_HINT_FAILED':
			return [];
		default:
			return state;
	}
}