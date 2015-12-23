import React from 'react';
import { connect } from 'react-redux';

class PostSocial extends React.Component {

	render() {
		return (
			<div className="post-social">
				<i className="fa fa-caret-up" onClick={() => this.props.likePost()}></i>
				<h3 className="h3__likes">{this.props.like_count}</h3>
			</div>
		);
	}
};

export default PostSocial;