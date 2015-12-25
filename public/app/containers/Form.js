import React from 'react';
import { connect } from 'react-redux';
import * as postActions from '../actions/postActions';
import * as tagHintsActions from '../actions/tagHintsActions';
import * as talentHintsActions from '../actions/talentHintsActions';
import * as formActions from '../actions/formActions';

import Autocomplete from 'react-autocomplete';
import Talent from '../components/Talent';
import Tag from '../components/Tag';

@connect((state) => {
    return {
    	user: state.user,
    	tagHints: state.tagHints,
    	talentHints: state.talentHints,
    	formData: state.formData
    }
})

class Form extends React.Component{
	
	submitForm(){
		// submit the post and reset the form data
		this.props.dispatch(postActions.createPost(this.props.formData));
		// TODO: BAD doens't confirm it was posted correctly
		// 			need to create a state saying that post was successfully posted
		this.props.dispatch(formActions.resetFormState()) 
	}
	
	// updateFormData(...data){
	updateFormData(formData){
		console.log("Update Form");
		this.props.dispatch(formActions.setTempPostData(formData));
	}

	componentWillUnmount() {
		// reset the form data when unmounted
		this.props.dispatch(formActions.resetFormState())
	}

	render() {
		// goto home if user is not logged in
		if(!this.props.user.is_logged_in)
			this.props.dispatch(pushPath('/'));
		
		console.log("Form Data: ");
		console.log(this.props.formData);

		return (
			<div className="form-container">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					ref={(c) => this._title = c} 
					onChange={() => this.updateFormData({
						"title": this._title.value
					})}
				/><br />
				
				<label htmlFor="tagLine">Tag Line</label>
				<input
					type="text"
					name="tagLine"
					ref={(c) => this._tagLine = c}
					onChange={() => this.updateFormData({
						"tag_line": this._tagLine.value
					})}
				/><br />

				<label htmlFor="description">Description</label>
				<textarea
					type="text"
					name="description"
					ref={(c) => this._description = c}
					onChange={() => this.updateFormData({
						"description": this._description.value
					})}
				/><br />

				<label htmlFor="talentNeeded">Tags</label>
				<Autocomplete
          ref="_tag"
          items={this.props.tagHints}
          getItemValue={(item) => item.name}
          onSelect={(value, item) => {
            this.props.dispatch(formActions.addTempTag(item));
          }}
          onChange={(event, value) => {
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
        />
        <div className="form-talents">
					{this.props.formData.tags.map((item, index) => (
						<Tag
							key={item._id}
							name={item.name}
							icon={item.icon}
							handleClick={() => {
								this.props.dispatch(formActions.removeTempTag(index))
							}} />
					))}
        </div>
        <br />

				<label htmlFor="talents">Talent Needed</label>
				<Autocomplete
          ref="_talent"
          items={this.props.talentHints}
          getItemValue={(item) => item.name}
          onSelect={(value, item) => {
          	this.props.dispatch(formActions.addTempTalent(item))
          }}
          onChange={(event, value) => {
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
        />
        <div className="form-talents">
					{this.props.formData.talent_needed.map((item, index) => (
						<Talent
							key={item._id}
							talent={item.name}
							color={item.color} 
							handleClick={() => {
								this.props.dispatch(formActions.removeTempTalent(index))
							}}
						/>
					))}
        </div>
        <br />

				<label htmlFor="imgs">Upload images</label>
				<input type="file" name="imgs" ref={(c) => this._imgs = c} /> 

				<button onClick={() => this.submitForm()}>Submit</button>
				<button
					onClick={() => {
						this.props.dispatch(formActions.resetFormState())
					}}>
						Reset
				</button>
			</div>
		)
	}
}


export default Form;