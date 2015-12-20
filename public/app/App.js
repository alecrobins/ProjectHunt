var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var routes = require('./config/routes.js');
import { Provider } from 'react-redux';
import store from './store/Store';
import { createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router'

const history = createHistory()

syncReduxAndRouter(history, store)

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>{routes}</Router>
	</Provider>,
	document.getElementById('app')
)