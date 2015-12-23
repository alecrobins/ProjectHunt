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
		console.log("HOME::: ");
		console.log(this.props);
		// if(this.props.user.is_logged_in){
		// 	console.log(this.props.user);
		// }else{
		// 	console.log("NO USER LOGGED IN");
		// }

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
