// Post Monogo Schemea 
var mongoose = require('mongoose');
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
		default: "000000"
	}
});

TalentSchema.index({name: 'text'});

exports.schema = TalentSchema;