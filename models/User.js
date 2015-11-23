// User Monogo Schemea 

exports.userSchemea = new mongoose.Schema({
 	"user_id": Number,
	"name": String,
	"email": String,
	"password": String,
	"updated_at": Date,
	"created_at": Date,
	"profile_url": String,
	"occupation": String,
	"profile": String,
	"social": {
		"github": String,
		"linkedin": String,
		"website": String,
		"twitter": String,
		"facebook": String,
		"instagram": String
	}
});
