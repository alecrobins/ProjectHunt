// Post Monogo Schemea 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.schema = new mongoose.Schema({
 	"name": {
 		type: String,
 		max: 1000
 	},
 	"color": String
});
