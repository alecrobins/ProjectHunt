// Routes asociated with Actions (likes, commenting, sharing, etc.)

// POST 'api/actions/like' (id of the post is passed in the body of the request)
module.exports.like = function(req, res, next){
	if(req.body){
		// only update if user has not already liked the post
		// increment like count and add user to the list of liked user
		req.db.Post.findOneAndUpdate(
			{
				"id": req.body.post,
				"likes": {$ne: req.session.passport.user._id}
			},
			{
				$inc: {"like_count": 1},
				$push: {"likes": req.session.passport.user._id}
			},
			function(err, obj){
				if(err) next(err);
				res.json(obj);
			})
	}else{
		next(new Error('No post id'));
	}
}