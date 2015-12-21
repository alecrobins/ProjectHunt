import React from 'react'
import SearchBar from './SearchBar'

export default () => {
	return (
		<div className="nav-container -clear">
			<img src="assets/imgs/logo.png" alt="Project Hunt Logo" className="nav-logo" />
			<SearchBar />
			<h3 className="nav-container--login">Login</h3>
		</div>
	)
}
