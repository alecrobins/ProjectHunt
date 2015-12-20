var React = require('react');
import Store from '../store/Store';
import {saySomething, asyncSayActionCreator_1} from '../actions/testActions'

var Home = React.createClass({
	
	componentWillMount: function(){
		Store.dispatch(saySomething("Hello World"));
		Store.dispatch(asyncSayActionCreator_1("New Message"));
	},

	render: function() {
		console.log(Store.getState());

		return (
			<h2 className="testClassName">
				Home Expot
			</h2>
		);
	}
});

module.exports = Home;