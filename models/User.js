// User Monogo Schemea 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.schema = new mongoose.Schema({
	"username":{
		required: true,
		type: String,
		max: 1000,
		unique: true
	},
	"first_name": {
		required: true,
		type: String,
		max: 1000
	},
	"last_name": {
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
		required: true,
		type: String,
		max: 1000
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
