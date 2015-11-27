// Main routes associated with Search routes

// GET '/api/search/:query'
module.exports.getPosts = function(req, res, next){
	var page = req.query.page;
	var limit = req.query.limit;

	if(req.params.query != ""){
		// return the post that has the highest text score match
		// most recent post with the highest likes
		req.db.Post
			.find({
				$text: { $search : req.params.query }, 
        		skip: (page - 1) * limit,
        		limit: limit,
        		sort: {
        			score: { $meta: "textScore" },
        			like_count: -1,
        			created_at: -1	
        		}
			
    		})
    		.exec(function(err, results) {
        		if(err) next(err);
        		res.status(200).json(results);
    		});
	}else{
		next(new Erorr('No query'));
	}
}
