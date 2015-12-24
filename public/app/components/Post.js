import React from 'react';
import { connect } from 'react-redux';
import PostSocial from './PostSocial';
import Talent from './Talent';

class Post extends React.Component {

	render() {
		// <p className="p__main">{this.props.description}</p>
		return (
			<div className="post-container--inner">
				
				<PostSocial {...this.props} />

				<div className="post-content">
					
					<h1 className="h1__title">{this.props.title}</h1>
					<h2 className="h2__tagline">{this.props.tag_line}</h2>
					
					<div className="post-content__author">
						<img src={this.props.post_author.photo_url} alt="Profile picture" className="profile" />
						<h4 className="h4">{this.props.post_author.name}</h4>
						<Talent talent="Biz Dev" color="#00D5FF" />
					</div>

					<p className="p__main"> {this.props.description} </p>

				</div>
				
				<div className="post-img">
					<img src="/assets/imgs/postFiller.jpg" alt="profile filler" className="post-img__feature" />
				</div>
			</div>
		);
	}
};

export default Post;