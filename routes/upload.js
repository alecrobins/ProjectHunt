
// POST 'api/upload'
module.exports.upload = function(req, res, next){
	console.log(req.files)
	res.json({"hello": "world"});
}

module.exports.deleteUpload = function(req, res, next){
	res.json({"hello": "world"});
}