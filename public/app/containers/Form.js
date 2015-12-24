import React from 'react';
import { connect } from 'react-redux';
import * as postActions from '../actions/postActions';
import * as tagHintsActions from '../actions/tagHintsActions';
import * as talentHintsActions from '../actions/talentHintsActions';

import Autocomplete from 'react-autocomplete';
import Talent from '../components/Talent';

@connect((state) => {
    return {
    	user: state.user,
    	tagHints: state.tagHints,
    	talentHints: state.talentHints
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
		// TODO: need to reset all the temp features
		// TODO: need to change the path to the home page
	}
	
	componentWillUnmount() {
		// TODO: need to reset all the temp features
	}

	render() {
		// goto home if user is not logged in
		if(!this.props.user.is_logged_in)
			this.props.dispatch(pushPath('/'));

		return (
			<div className="form-container">
				<label htmlFor="title">Title</label>
				<input type="text" name="title" ref={(c) => this._title = c} /><br />
				
				<label htmlFor="tagLine">Tag Line</label>
				<input type="text" name="tagLine" ref={(c) => this._tagLine = c} /><br />

				<label htmlFor="description">Description</label>
				<textarea type="text" name="description" ref={(c) => this._description = c} /><br />

				<label htmlFor="talentNeeded">Tags</label>
				<Autocomplete
          // ref="tags"
          items={this.props.tagHints}
          getItemValue={(item) => item.name}
          onSelect={(value, item) => {
            // TODO: need to dispatch the item as selected
            console.log("ITEM SECLTED: ", item);
          }}
          onChange={(event, value) => {
            // TODO: need to only dispatch a request to get
            // hints only if stopped typing
            console.log("AUTOCOMPELETE CHANGING: ");
						this.props.dispatch(tagHintsActions.getTagHints(value));
          }}
          renderItem={(item, isHighlighted) => {
          	const iconClass = `fa fa-${item.icon}`
            return (
            	<div key={item.abbr} id={item.abbr}>
            		<i className={iconClass}></i> {item.name}
            	</div>
            )
          }}
        /> <br />

				<label htmlFor="tags">Talent Needed</label>
				<Autocomplete
          // ref="talentNeeded"
          items={this.props.talentHints}
          getItemValue={(item) => item.name}
          onSelect={(value, item) => {
            // TODO: need to dispatch the item as selected
            console.log("TALENT ITEM SECLTED: ", item);
          }}
          onChange={(event, value) => {
            // TODO: need to only dispatch a request to get
            // hints only if stopped typing
            console.log("TALENT AUTOCOMPELETE CHANGING: ");
						this.props.dispatch(talentHintsActions.getTalentHints(value));
          }}
          renderItem={(item, isHighlighted) => {
          	const iconClass = `fa fa-${item.icon}`
            return (
            	<Talent
            		key={item.abbr}
            		id={item.abbr}
            		talent={item.name}
            		color={item.color} />
            )
          }}
        /> <br />

				<label htmlFor="imgs">Upload images</label>
				<input type="file" name="imgs" ref={(c) => this._imgs = c} /> 

				<button onClick={() => this.submitForm()}>Submit</button>
			</div>
		)
	}
}

export default Form;