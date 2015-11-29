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
   	res.sendStatus(404);
	}

	// set up passport with mongo connection
	routes.passport(connection);

	// LOCAL STRATEGY LOGIN
	app.post('/api/local-signup', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	app.post('/api/local-login', passport.authenticate('local-login', {
		successRedirect : '/', 
		failureRedirect : '/login',
		failureFlash : true // allow flash messages
	}));

	// FACEBOOK AUTH
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback',
  		passport.authenticate('facebook', {
         successRedirect : '/',
         failureRedirect : '/login'
      }));

   app.get('/api/logout', function(req, res, next) {

		req.logout();
		console.info('Logout USER: ' + req.session.userId);
  		
  		req.session.destroy(function(error) {
    		if (error) next(error);
			res.redirect('/');
  		});});

	//MAIN
	app.get('/api/profile', passport.authenticate('facebook'), db, routes.main.profile);
	app.delete('/api/profile', passport.authenticate('facebook'), db, routes.main.delProfile);

	// POSTS
	app.get('/api/posts', db, routes.posts.getPosts);
	app.post('/api/posts', isLoggedIn, db, routes.posts.add);
	app.get('/api/posts/:id', isLoggedIn, db, routes.posts.getPost);
	app.put('/api/posts/:id', isLoggedIn, db, routes.posts.updatePost);
	app.delete('/api/posts/:id', isLoggedIn, db, routes.posts.delete);

	// TALENT
	//TODO: need to add routes:
		// - add new talent
		// - delete talent
		// - search posts that contain talents

	// ACTIONS
	app.post('/api/actions/like', isLoggedIn, db, routes.actions.like);

	// USERS
	app.get('/api/users/:id', isLoggedIn, db,routes.users.getUser);
	app.put('/api/users/:id', isLoggedIn, db, routes.users.update);
	app.delete('/api/users/:id', isLoggedIn, db, routes.users.delete);

	// //SEARCH
	app.get('/api/search/:query', db, routes.search.getPosts);

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

};