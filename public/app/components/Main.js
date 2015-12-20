import React from 'react'

class Main extends React.Component{
	render() {
		return (
			<div className="main-contianer">
				<div>
					Nav Bar goes here
				</div>
				<div className="contianer">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Main;
