// Main routes that handle profile requests

// GET '/api/profile'
module.exports.profile = function(req, res, next){
	req.db.User.findOne({ "_id": req.session.passport.user._id }, function(err, user) {
		console.log('err', err)
		if (err) return next(err);
		res.json(user);
  	});  	
}

// DELETE '/api/profile'
module.exports.delProfile = function(req, res, next){
	req.db.User.remove({"_id": req.session.user._id}, function(err, obj){
		if(err) return next(err);
		
		// destroy the current session
		req.session.destroy(function(error) {
      	if (err) next(err)
    	});

		res.json(obj);
	})
}
