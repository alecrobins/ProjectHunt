// Post Monogo Schemea 
var mongoose = require('mongoose');
var randomColor = require('randomcolor');
var Schema = mongoose.Schema;

var TagSchema = new mongoose.Schema({
 	"name": {
 		type: String,
 		max: 1000,
 		unique: true
 	},
 	"count": {
 		type: Number,
  	default: 0
 	},
	"icon": { // correlates to the font awesome 
		type: String,
		required: true,
		default: "fa-tag",
	}
});

TagSchema.index({name: 1});

exports.schema = TagSchema;