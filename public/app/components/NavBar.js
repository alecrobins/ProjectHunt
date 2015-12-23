import React from 'react'
import SearchBar from './SearchBar'

export default () => {
	return (
		<div className="nav-container -clear">
			<img src="assets/imgs/logo.png" alt="Project Hunt Logo" className="nav-logo" />
			<SearchBar />
			<h3 className="nav-container--login">
				<a href="/auth/twitter">Login in with Twitter</a>
				<br />
				<a href="/auth/facebook">Login in with Facebook</a>
				<br />
				<a href="/api/logout">Logout</a>
			</h3>
		</div>
	)
}
