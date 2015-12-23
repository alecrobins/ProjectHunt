import React from 'react'
import { connect } from 'react-redux'
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
		const logIn = this.props.user.is_logged_in ?
			<NavBarUser {...this.props.user} /> :
			<a href="/auth/facebook">SIGN IN</a>

		return (
			<div className="nav-container -clear">
				<img src="assets/imgs/logo.png" alt="Project Hunt Logo" className="nav-logo" />
				<SearchBar />
				{logIn}
			</div>
		)	
	}

}

export default NavBar;
