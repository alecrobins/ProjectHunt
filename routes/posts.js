// Main routes that handle posts requests

// GET '/api/posts'
module.exports.getPosts = function (req, res, next) {
	// var page = req.query.page;
	// var limit = req.query.limit;

	req.db.Post.paginate({},
		{
	   	page: 1, // TODO: generate from params
	   	limit: 10, // TODO: generate from params
	   	sortBy: {
	      	created_at: -1
	    	},
	    	// lean: true
	  	}, function(err, results) {
			if(err) next(err);
			res.json(results);
		});
}

// POST '/api/posts'
module.exports.add = function (req, res, next) {
	if (req.body) {
		// create a new post
		req.db.Post.create({
			"post_author": req.session.passport.user._id,
			"title": req.body.title,
			"description": req.body.description,
			"talent_needed": req.body.talent_needed || null,
			"feature_img": req.body.feature_img || null,
			"imgs": req.body.imgs || null,
			"contact": req.body.contact != null ?
				{
					"email": req.body.contact.email || null,
					"phone": req.body.contact.phone || null,
					"github": req.body.contact.github || null,
					"website": req.body.contact.website || null
				} : null
		}, function(err, result){
			if (err) next(err);
	      res.json(result);
		});
	}else{
		next(new Error('No data'));
	}
}

// GET '/api/posts/:id'
module.exports.getPost = function (req, res, next) {
	if (req.params.id) {
   	req.db.Post.findOne({"id": req.params.id}, function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
	}else{
		next(new Error('No query'));
	}
}

// PUT '/api/posts/:id' 
module.exports.updatePost = function (req, res, next) {
	if(req.body){
		req.db.Post.update(
		{
			"id": req.body.id,
			"post_author": req.session.user._id
		},
		{
			"title": req.body.title,
			"description": req.body.description,
			"talent_needed": req.body.talent_needed || null,
			"feature_img": req.body.feature_img || null,
			"imgs": req.body.imgs || null,
			"contact": {
				"email": req.body.contact.email || null,
				"phone": req.body.contact.phone || null,
				"github": req.body.contact.github || null,
				"website": req.body.contact.website || null
			}
		},
		function(err, obj){
			if(err) next(err);
			res.json(obj);
		});
	}else{
		next(new Error('No data'));
	}
}

// DELETE '/api/posts/:id'
module.exports.delete = function (req, res, next) {
	if(req.params.id){
		req.db.Post.remove(
			{
				"id": req.params.id,
				"post_author": req.session.user._id
			},
			function(err, obj){
				if(err) next(err);
				res.json(obj);
			});
	}else{
		next(new Error('No post id'));
	}
}