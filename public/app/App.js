import '../assets/scss/screen.scss'; // includes the main scss file
import React from 'react';
import ReactDOM from 'react-dom'
import { Router } from 'react-router';
import routes from './config/routes.js';
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