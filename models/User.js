// User Monogo Schemea 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	"name": {
		required: true,
		type: String,
		max: 1000
	},
	"email":  {
		type: String,
		max: 1000,
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
	"bio": {
		type: String,
		max: 1000
	},
	"talent": [{
		type: Schema.Types.ObjectId,
		ref: 'Talent'
	}],
	"facebook":{
		"id": String,
		"token": String,
	},
	"twitter":{
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

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

exports.schema = UserSchema;