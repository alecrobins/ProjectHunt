import React from 'react';
import { connect } from 'react-redux';

@connect((state) => {
    return {
    	// user: state.user,
    }
})

class Profile extends React.Component {
	componentDidMount(){
		console.log("PROFILE MOUNTED");
	}
	componentWillUnmount(){
		console.log("!!!Unmounting");
	}
	render() {
		return <h1>Profile</h1>;
	}
};

export default Profile;