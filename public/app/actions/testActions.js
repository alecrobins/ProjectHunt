export function saySomething(msg){
	return {
		type: 'SAY_SOMETHING',
		value: msg
	};
}

export function asyncSayActionCreator_1(msg){
	return function(dispatch) {
		setTimeout(function() {
			dispatch({
				type: 'SAY_SOMETHING',
				value: msg
			})
		}, 2000)
	}
}

export function increment(){
	return {
		type: 'INCREMENT'
	}
}

export function decrement(){
	return {
		type: 'DECREMENT'
	}
}