import React from 'react'
import { pushPath } from 'redux-simple-router'
import * as uiActions from '../actions/uiActions'

class NavBarUser extends React.Component {

	render(){
		return (
			<div>
				<img src={this.props.user.userData.photo_url} alt="Profile picture" />
				{this.props.user.userData.name}
				<a href="/api/logout">Log Out</a>
				<button onClick={() => this.props.dispatch(pushPath('/createPost'))}>
					Creat Post
				</button>
			</div>
		)
	}

}

export default NavBarUser;
