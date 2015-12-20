var React = require('react');

var Main = React.createClass({
	render: function() {
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

});

module.exports = Main;