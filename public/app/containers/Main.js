import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { initAuthed } from '../actions/authed';

@connect((state) => {
    return {
    	user: state.user
    }
})

class Main extends React.Component{
	componentDidMount(){
		this.props.dispatch(initAuthed());
	}
	render() {

		return (
			<div className="main-contianer">
				<div>
					<NavBar />
				</div>
				<div className="contianer">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Main;
