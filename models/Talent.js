// Post Monogo Schemea 

exports.schema = new mongoose.Schema({
 	"name": {
 		type: String,
 		max: 1000
 	},
 	"color": String
});
