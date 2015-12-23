import React from 'react';
import { connect } from 'react-redux';
import * as postActions from '../actions/postActions';

@connect((state) => {
    return {
    	user: state.user
    }
})

class Form extends React.Component{
	
	submitForm(){
		console.log("Submitting the form");
		
		const postData = {
			"title": this._title.value,
			"tag_line": this._tagLine.value,
			"description": this._description.value,
			// "talent_needed": req.body.talent_needed || null,
			// "tags": req.body.tags || null,
			// "feature_img": req.body.feature_img || null,
			// "imgs": req.body.imgs || null,
			// "contact": req.body.contact != null ?
			// 	{
			// 		"email": req.body.contact.email || null,
			// 		"phone": req.body.contact.phone || null,
			// 		"github": req.body.contact.github || null,
			// 		"website": req.body.contact.website || null
			// 	}
		}

		// submit the post
		this.props.dispatch(postActions.createPost(postData));
	}
	render() {
		// goto home if user is not logged in
		if(!this.props.user.is_logged_in)
			this.props.dispatch(pushPath('/'));

		return (
			<div className="form-contianer">
				<label htmlFor="title">Title</label>
				<input type="text" name="title" ref={(c) => this._title = c} />
				
				<label htmlFor="tagLine">Tag Line</label>
				<input type="text" name="tagLine" ref={(c) => this._tagLine = c} />

				<label htmlFor="description">Tag Line</label>
				<textarea type="text" name="description" ref={(c) => this._description = c} />

				<button onClick={() => this.submitForm()}>Submit</button>
			</div>
		)
	}
}

export default Form;