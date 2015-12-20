import React from 'react';
import Home from '../components/Home';
import Main from '../components/Main';
import {Route, IndexRoute} from 'react-router';

export default (
		<Route path="/" component={Main}>
			<IndexRoute component={Home} />
		</Route>
)