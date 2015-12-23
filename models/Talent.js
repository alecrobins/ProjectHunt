// Post Monogo Schemea 
var mongoose = require('mongoose');
var randomColor = require('randomcolor');
var Schema = mongoose.Schema;

var TalentSchema = new mongoose.Schema({
 	"name": {
 		type: String,
 		max: 1000,
 		unique: true
 	},
 	"count": {
 		type: Number,
  	default: 0
 	},
	"color": {
		type: String,
		default: randomColor({ luminosity: 'bright' })
	}
});

TalentSchema.index({name: 1});

exports.schema = TalentSchema;