import React from 'react';
import { connect } from 'react-redux';

@connect((state) => {
    return {
    	// user: state.user,
    }
})

class ProfileEdit extends React.Component {
	componentDidMount(){
		console.log("PROFILE MOUNTED");
	}
	componentWillUnmount(){
		console.log("!!!Unmounting");
	}
	render() {
		return <h1>Profile Edit</h1>;
	}
};

export default ProfileEdit;