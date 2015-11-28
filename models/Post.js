// Post Monogo Schemea 
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
 	"post_author": {
 		required: true,
 		type: Schema.Types.ObjectId,
 		ref: 'User'
 	},
 	"likes": [{
   	type: Schema.Types.ObjectId,
   	ref: 'User'
  	}],
  	"like_count":{
  		type: Number,
  		default: 0
  	},
	"title": { 
		required: true,
		type: String,
		trim: true,
		max: 1000
	},
	"description": {
		required: true,
		type: String,
		trim: true,
		max: 3000
	},
	"talent_needed": [{
		type: Schema.Types.ObjectId,
		ref: 'Talent'
	}],
	"created_at": {
		required: true,
		type: Date,
		default: Date.now
	},
	"updated_at": {
		required: true,
		type: Date,
		default: Date.now
    },
	"feature_img": String,
	"imgs": [String],
	"contact": {
		"email": {
			type: String,
			trim: true
		},
		"phone": {
			type: String,
			trim: true
		},
		"github": {
			type: String,
			trim: true
		},
		"website": {
			type: String,
			trim: true
		},
	}
});

// Create an index on the title and description
PostSchema.index({ title: 'text', description: 'text'}, {name: 'Post index', weights: {title: 5, description: 4}});
PostSchema.plugin(mongoosePaginate);

// export the schema
module.exports.schema = PostSchema;