// Routes asociated with Talend (creating and finding talents)
var randomColor = require('randomcolor');

// POST 'api/talent'
module.exports.addTalent = function(req, res, next){
	if(req.body && req.body.name){
		// create a new post
		req.db.Talent.create({
			"name": req.body.name.toUpperCase(),
			"color": randomColor({ luminosity: 'bright' })
		}, function(err, result){
			if (err) next(err);
	    res.json(result);
		});
	}else{
		next(new Error('No data'));
	}
}

module.exports.searchTalent = function(req, res, next){
	var regex = new RegExp(req.params.query, "i");
	req.db.Talent
		.find(
      { name: {$regex: regex }}
		)
 		.limit(5)
		.exec(function(err, results) {
			if(err) next(err);
			res.json(results);
		});
}