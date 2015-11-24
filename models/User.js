// User Monogo Schemea 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

var UserSchema = new mongoose.Schema({
	"name": {
		required: true,
		type: String,
		max: 1000
	},
	"email":  {
		required: true,
		type: String,
		max: 1000,
		unique: true
	},
	"banned": {
   	type: Boolean,
   	default: false
  	},
	"password": String,
	"updated_at": {
		type: Date,
		default: Date.now
	},
	"created_at": {
		type: Date,
		default: Date.now
	},
	"photo_url": String,
	"occupation": {
		type: String,
		max: 1000
	},
	"facebook":{
		"id": String,
		"token": String,
	},
	"social": {
		"github": String,
		"linkedin": String,
		"website": String,
		"twitter": String,
		"facebook": String,
		"instagram": String
	}
});

// add the findOrCreate plugin for user models
UserSchema.plugin(findOrCreate);

exports.schema = UserSchema;