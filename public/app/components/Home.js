import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/testActions';


@connect((state) => {
    return {
    	count: state.count
    }
})

class Home extends React.Component {
	
	constructor(){
		super();
	}

	render() {
		return (
			<div className="testClassName">
				<h1>{this.props.count}</h1>
				<button onClick={() => this.props.dispatch(actions.increment())}>Increase</button>
				<button onClick={() => this.props.dispatch(actions.decrement())}>Decrease</button>
			</div>
		);
	}
};

export default Home;