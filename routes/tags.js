// Routes asociated with Tag (creating and finding tags)

// POST '/api/tag'
module.exports.addTag = function(req, res, next){
	if(req.body && req.body.name){
		// create a new post
		req.db.Tag.create({
			"name": req.body.name.toUpperCase(),
			"icon": req.body.icon
		}, function(err, result){
			if (err) next(err);
	    res.json(result);
		});
	}else{
		next(new Error('No data'));
	}
}

module.exports.searchTag = function(req, res, next){
	var regex = new RegExp(req.params.query, "i");
	req.db.Tag
		.find(
      { name: {$regex: regex }}
		)
 		.limit(5)
 		.sort({
 			"count": -1
 		})
		.exec(function(err, results) {
			if(err) next(err);
			res.json(results);
		});
}