import React from 'react';
import Home from '../containers/Home';
import Main from '../containers/Main';
import {Route, IndexRoute} from 'react-router';

export default (
		<Route path="/" component={Main}>
			<IndexRoute component={Home} />
		</Route>
)