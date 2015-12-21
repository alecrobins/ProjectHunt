import React from 'react'
import SearchBar from './SearchBar'

export default () => {
	return (
		<div className="nav-container">
			<img src="assets/imgs/logo.png" alt="Project Hunt Logo" className="nav-logo" />
			<SearchBar />
			<i className="fa fa-pencil-square-o"></i>
		</div>
	)
}
