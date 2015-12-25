import React from 'react';
import { connect } from 'react-redux';

export default (props) => {
	var className = `fa fa-${props.icon} icon`;
	return <div className="tag border" onClick={props.handleClick}>
		<i className={className}></i> {props.name}
	</div>
}