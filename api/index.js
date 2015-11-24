var routes = require('../routes/');
var models = require('../models/');

module.exports = function(app, connection){

	// function to connect to the database
	function db (req, res, next) {
	  req.db = {
	    User: connection.model('User', models.User, 'users'),
	    Post: connection.model('Post', models.Post, 'posts'),
	    Talent: connection.model('Talent', models.Talent, 'talents')
	  };
	  return next();
	}

	//TEST CONNECTION
	app.post('/api/test', db, function(req, res, next){
		
		var user = new req.db.User({
			"username": "newUser",
			"first_name": "Test",
			"last_name": "User",
			"email": "test@example.com",
			"password": "test",
			"occupation": "Backend End Developer",
			"social": {
				"github": "github.com/testUser",
				"website": "testUser.me",
			}
		});
		
		user.save(function(err) {
		   if (err) next(err);
		   res.json(user);
		});

	});

	app.get('/api/test', db, function(req, res, next){

		req.db.User.find().exec(function (err, user) {
		  if (err) return handleError(err);
		  res.json(user);
		});

	});
	
	//MAIN
	// app.get('/api/profile', checkUser, db, routes.main.profile);
	// app.del('/api/profile', checkUser, db, routes.main.delProfile);
	// app.post('/api/login', db, routes.main.login);
	// app.post('/api/logout', routes.main.logout);

	// //POSTS
	// app.get('/api/posts', checkUser, db, routes.posts.getPosts);
	// app.post('/api/posts', checkUser, db, routes.posts.add);
	// app.get('/api/posts/:id', checkUser, db, routes.posts.getPost);
	// app.put('/api/posts/:id', checkUser, db, routes.posts.updatePost);
	// app.del('/api/posts/:id', checkUser, db, routes.posts.del);

	// //USERS
	// app.get('/api/users', checkUser, db, routes.users.getUsers);
	// app.get('/api/users/:id', checkUser, db,routes.users.getUser);
	// app.post('/api/users', checkAdmin, db, routes.users.add);
	// app.put('/api/users/:id', checkAdmin, db, routes.users.update);
	// app.del('/api/users/:id', checkAdmin, db, routes.users.del);

	// //SEARCH
	// app.get('/api/search/:query', db, routes.search.getPosts);

};