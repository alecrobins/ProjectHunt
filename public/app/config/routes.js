import React from 'react';
import Home from '../containers/Home';
import Main from '../containers/Main';
import Profile from '../containers/Profile';
import ProfileEdit from '../containers/ProfileEdit';
import {Route, IndexRoute} from 'react-router';

export default (
		<Route path="/" component={Main}>
			<Route path="profile" component={Profile}/>
			<Route path="profile/edit" component={ProfileEdit}/>
			<IndexRoute component={Home} />
		</Route>
)