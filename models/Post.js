// Post Monogo Schemea 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.postSchemea = new mongoose.Schema({
 	"post_author": {
 		required: true,
 		type: Schema.Types.ObjectId,
 		ref: 'User'
 	},
 	"likes": [{
   	type: Schema.Types.ObjectId,
   	ref: 'User'
  	}],
	"title": 
		required: true,
		type: String,
		trim: true
	},
	"description": {
		required: true,
		type: String,
		trim: true
	},
	"talent_needed": [{
		type: Schema.Types.ObjectId,
		ref: 'Talent'
	}],
	"created_at": {
		required: true,
		default: Date.now
	},
	"updated_at": {
		required: true,
		default: Date.now
    },
	"feature_img": String,
	"imgs": [String],
	"contact": {
		"email": String,
		"phone": String,
		"github": String,
		"website": String,
	}
});
