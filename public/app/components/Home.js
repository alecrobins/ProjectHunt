import React from 'react';
import { connect } from 'react-redux';
import {saySomething, asyncSayActionCreator_1} from '../actions/testActions';


@connect((state) => {
    return {
    	messages: state.messages,
    	pizzas: state.pizzas,
    	routing: state.routing
    }
})

class Home extends React.Component {
	
	componentWillMount(){
		this.props.dispatch(saySomething("Hello World"));
		this.props.dispatch(asyncSayActionCreator_1("New Message"));
	}

	render() {

		console.log("RENDERED");
		console.log(this.props);

		const test = this.props.messages.message === "New Message" ?
			<h1>NEW MESSAGE</h1> : <h1>Not New :(</h1>;

		return (
			<div className="testClassName">
				{test}
			</div>
		);
	}
};

export default Home;