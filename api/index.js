var routes = require('../routes/');
var models = require('../models/');
var config = require('../config');
var passport = require('passport');
var multer = require('multer');

module.exports = function(app, connection) {

	// function to connect to the database
	function db(req, res, next) {
		req.db = {
			User: connection.model('User', models.User, 'users'),
			Post: connection.model('Post', models.Post, 'posts'),
			Talent: connection.model('Talent', models.Talent, 'talents'),
			Tag: connection.model('Tag', models.Tag, 'tags')
		};
		return next();
	}

	// check if user is logged in
	function isLoggedIn(req, res, next) {
		// if user is authenticated in the session, carry on
		if (req.isAuthenticated()) return next();
		res.sendStatus(401);
	}

	// set up passport with mongo connection
	routes.passport(connection);

	// LOCAL STRATEGY LOGIN
	app.post('/api/local-signup', passport.authenticate('local-signup', {
		successRedirect: '/', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	app.post('/api/local-login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true // allow flash messages
	}));

	// FACEBOOK AUTH
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	// TWITTER AUTH
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.get('/api/logout', function(req, res, next) {
		req.logout();
		console.info('Logout USER: ' + req.session.userId);

		req.session.destroy(function(error) {
			if (error) next(error);
			res.redirect('/');
		});
	});

	//MAIN
	app.get('/api/profile', passport.authenticate('facebook'), db, routes.main.profile);
	app.delete('/api/profile', passport.authenticate('facebook'), db, routes.main.delProfile);

	// POSTS
	app.get('/api/posts', db, routes.posts.getPosts);
	app.post('/api/posts', isLoggedIn, db, routes.posts.add);
	app.get('/api/posts/:id', isLoggedIn, db, routes.posts.getPost);
	app.put('/api/posts/:id', isLoggedIn, db, routes.posts.updatePost);
	app.delete('/api/posts/:id', isLoggedIn, db, routes.posts.delete);
	
	// UPLOAD
	
	// set uploading middleware
	var uploading = multer({
	  dest: 'public/uploads/',
	  limits: {fileSize: 2000000, files:5},
	  rename: function (fieldname, filename) {
        return filename+"_"+Date.now();
    },
	})

	app.post('/api/upload', uploading.array(), db, routes.upload.upload) ;
	app.delete('/api/upload', db, routes.upload.deleteUpload) ;

	// TALENT
	app.post('/api/talent', db, routes.talent.addTalent);
	app.get('/api/talent/:query', db, routes.talent.searchTalent);

	// TAG
	app.post('/api/tag', db, routes.tags.addTag);
	app.get('/api/tag/:query', db, routes.tags.searchTag);

	// ACTIONS
	app.post('/api/actions/like', isLoggedIn, db, routes.actions.like);

	// USERS
	app.get('/api/user', isLoggedIn, db, routes.users.getCurrentUser);
	app.get('/api/users/:id', isLoggedIn, db, routes.users.getUser);
	app.put('/api/users/:id', isLoggedIn, db, routes.users.update);
	app.delete('/api/users/:id', isLoggedIn, db, routes.users.delete);

	// SEARCH
	// TODO: search needs to query posts based on 	
	app.get('/api/search/:query', db, routes.search.getPosts);
	
	// Reroute all other routes to the index adn let
	// the front end router handle the routes
	app.get('*', function(req, res) {
    res.redirect('/');
  });
};