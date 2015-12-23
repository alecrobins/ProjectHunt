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
						<img src="" alt=""/>
						<h4 className="h4">Alec Robins</h4>
						<Talent talent="Biz Dev" color="#00D5FF" />
					</div>

					<p className="p__main">
						Apester was started by @MotiCohen in order to challenge the current way content was being consumed by audiences. He set out to change the unilateral conversation that was being had between content creators and content consumers. Behold Apester, a new digital way to communicate and engage with your audience by making the audience an integral part of the content. Apester puts the voice of the reader back into the story to create a two way conversation. 
					</p>

				</div>
			</div>
		);
	}
};

export default Post;