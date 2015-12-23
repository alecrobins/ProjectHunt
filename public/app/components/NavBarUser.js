import React from 'react'
import * as uiActions from '../actions/uiActions'

class NavBarUser extends React.Component {

	render(){
		return (
			<div>
				<h3> Nav bar user </h3>
				<img src={this.props.userData.photo_url} alt="Profile picture" />
				{this.props.userData.name}
				<a href="/api/logout">Log Out</a>
			</div>
		)
	}

}

export default NavBarUser;
