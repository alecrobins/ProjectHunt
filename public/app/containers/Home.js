import React from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router'
import * as actions from '../actions/postActions';
import Post from '../components/Post';

@connect((state) => {
    return {
    	count: state.count,
    	posts: state.posts
    }
})

class Home extends React.Component {
	
	constructor(){
		super();
	}

	componentDidMount(){
		this.props.dispatch(actions.getPosts());
	}

	handleClick(postID){
		console.log(postID);
		this.props.dispatch(actions.likePost(postID));
	}

	render() {
		const { postData } = this.props.posts;
		if(postData === []) return <h1> LOADING </h1>

		return (
			<div>
				<div className="post-list--container">
					{postData.map((item, index) => 
						<Post likePost={() => this.handleClick(item._id)} key={item._id} {...item} />)}
				</div>
			</div>
		);
	}
};

export default Home;