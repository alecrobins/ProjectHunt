import React from 'react';
import { connect } from 'react-redux';

export default (props) => {
	const style = {
		"background": props.color
	}
	return <div className="tag talent" onClick={props.handleClick} style={style}>{props.talent}</div>
}