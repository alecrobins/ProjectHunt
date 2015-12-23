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
	"tag_line": {
		default: "", 
		required: true,
		type: String,
		trim: true,
		max: 2000
	},
	"description": {
		required: true,
		type: String,
		trim: true,
		max: 3000
	},
	"is_started":{
		type: Boolean,
		default: false,
	},
	"talent_needed": [{
		type: Schema.Types.ObjectId,
		ref: 'Talent'
	}],
	"tags": [{
		type: Schema.Types.ObjectId,
		ref: 'Tag'
	}],
	// "location": {
	// 	type: String,
 //    index: '2dsphere' 
	// },
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
		"links": [{
			type: String,
			trim: true
		}],
	}
});

// Create an index on the title and description
PostSchema.index({ title: 'text', description: 'text'}, {name: 'Post index', weights: {title: 5, description: 4}});
PostSchema.index({location: "2dsphere"});
PostSchema.index({talent_needed: 1});

PostSchema.plugin(mongoosePaginate);

// export the schema
module.exports.schema = PostSchema;