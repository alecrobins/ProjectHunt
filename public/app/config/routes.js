var React = require('react');
var Home = require('../components/Home.js');
var Main = require('../components/Main.js');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute; // the default route if no other paths match

module.exports = (
	<Route path="/" component={Main}>
		<IndexRoute component={Home} />
	</Route>
)