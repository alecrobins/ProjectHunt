import React from 'react'
import NavBar from '../components/NavBar'

class Main extends React.Component{
	render() {
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
