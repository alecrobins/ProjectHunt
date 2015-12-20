export function saySomething(msg){
	return {
		type: 'SAY_SOMETHING',
		value: msg
	};
}

export function asyncSayActionCreator_1(msg){
	return function(dispatch) {
		setTimeout(function() {
			console.log("CHANIGN");
			dispatch({
				type: 'SAY_SOMETHING',
				value: msg
			})
		}, 2000)
	}
}
