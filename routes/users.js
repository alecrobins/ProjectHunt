// Main routes the handle user requests

// fields of the user that are allowed to be returned to the client
var safeFields = 'name email photo_url occupation social';

// GET 'api/user' ( return the current user's information )
module.exports.getCurrentUser = function(req, res, next){
	if(req.session.passport.user){
		req.db.User.findOne({"_id": req.session.passport.user._id}, safeFields, function(err, user){
			if(err) next(err);
			res.json(user);
		});	
	}else{
		next(new Error('No user logged in '));
	}
	
}

// GET '/api/users/:id'
module.exports.getUser = function(req, res, next){
	req.db.User.findOne({"_id": req.params.id}, safeFields, function(err, user){
		if(err) next(err);
		res.json(user);
	});
}

// PUT '/api/users/:id'
module.exports.update = function(req, res, next){
	if(req.body && req.session.user._id == req.params.id){

		var newUserFields = req.body;
		newUserFields.updated_at = Date.now();

		req.db.User.update({ "id": req.session.user._id }, newUserFields,
			function(err, obj){
				if(err) next(err);
				res.json(obj);
			});

	}else{
		next(new Error('Wrong id'));
	}
}

// DELETE '/api/users/:id'
module.exports.delete = function(req, res, next){
	if(req.params.id && req.session.user._id == req.params.id){
		req.db.User.remove(
			{
				"_id": req.params.id,
				"post_author": req.session.user._id
			},
			function(err, obj){
				if(err) next(err);
				res.json(obj);
			});
	}else{
		next(new Error('Wrong id'));
	}
}