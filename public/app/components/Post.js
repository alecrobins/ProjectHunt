import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/testActions';

class Post extends React.Component {
	render() {
		return (
			<div className="post--container">
				<h1>{this.props.title}</h1>
				<h3>Likes: {this.props.like_count}</h3>
				<p>{this.props.description}</p>
				<small>Updated at: {this.props.created_at}</small>
			</div>
		);
	}
};

export default Post;