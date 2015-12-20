var React = require('react');
import Home from '../components/Home';
var Main = require('../components/Main');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute; // the default route if no other paths match


module.exports = (
		<Route path="/" component={Main}>
			<IndexRoute component={Home} />
		</Route>
)