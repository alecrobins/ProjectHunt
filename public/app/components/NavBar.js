import React from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import * as uiActions from '../actions/uiActions'
import SearchBar from './SearchBar'
import NavBarUser from './NavBarUser'

@connect((state) => {
    return {
    	user: state.user
    }
})

class NavBar extends React.Component {

	render(){
		// <button onClick={() => this.props.dispatch(uiActions.loginClicked())}>
		const login = this.props.user.is_logged_in ?
			<NavBarUser {...this.props} /> :
			<a href="/auth/facebook">SIGN IN</a>

		return (
			<div className="nav-container--inner -clear">
				<img
					src="assets/imgs/logo.png"
					alt="Project Hunt Logo"
					className="nav-logo"
					onClick={() => this.props.dispatch(pushPath('/'))} />
				<SearchBar />
				<div className="nav-login">
					{login}
				</div>
			</div>
		)	
	}

}

export default NavBar;
