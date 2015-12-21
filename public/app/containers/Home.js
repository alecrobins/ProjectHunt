import React from 'react';
import { connect } from 'react-redux';
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

	render() {
		const { postData } = this.props.posts;
		if(postData === []) return <h1> LOADING </h1>

		return (
			<div className="post-list--container">
				{postData.map((item, index) => <Post key={item._id} {...item} />)}
			</div>
		);
	}
};

export default Home;