var routes = require('../routes/');
var models = require('../models/');
var config = require('../config');
var passport = require('passport');

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

	// check if user is logged in
	function isLoggedIn(req, res, next) {

    	// if user is authenticated in the session, carry on
    	if (req.isAuthenticated()){
    		return next();
    	}
      
    	// if user isn't authenticated redirect to the login page
   	// res.redirect('/login');
   	res.send(404);
	}

	// set up passport with mongo connection
	routes.passport(connection);

	// FACEBOOK AUTH
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback',
  		passport.authenticate('facebook', {
         successRedirect : '/',
         failureRedirect : '/login'
      }));

   app.get('/logout', function(req, res, next) {

		req.logout();
		console.info('Logout USER: ' + req.session.userId);
  		
  		req.session.destroy(function(error) {
    		if (error) next(error);
			res.redirect('/');
  		});

   });

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
		});});
	app.get('/api/test', db, function(req, res, next){

		req.db.User.find().exec(function (err, user) {
		  if (err) return handleError(err);
		  res.json(user);
		});});

	//MAIN
	app.get('/api/profile', isLoggedIn, db, routes.main.profile);
	app.delete('/api/profile', isLoggedIn, db, routes.main.delProfile);

	// POSTS
	app.get('/api/posts', isLoggedIn, db, routes.posts.getPosts);
	app.post('/api/posts', isLoggedIn, db, routes.posts.add);
	app.get('/api/posts/:id', isLoggedIn, db, routes.posts.getPost);
	app.put('/api/posts/:id', isLoggedIn, db, routes.posts.updatePost);
	app.delete('/api/posts/:id', isLoggedIn, db, routes.posts.delete);

	// ACTIONS
	app.post('/api/actions/like', isLoggedIn, db, routes.actions.like);

	// USERS
	app.get('/api/users/:id', isLoggedIn, db,routes.users.getUser);
	app.put('/api/users/:id', isLoggedIn, db, routes.users.update);
	app.delete('/api/users/:id', isLoggedIn, db, routes.users.delete);

	// //SEARCH
	app.get('/api/search/:query', db, routes.search.getPosts);

};