var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var config = require('../config');
var models = require('../models/');

module.exports = function(connection){

    // set up local strategy for sign up
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true, // allows us to pass back the entire request to the callback
        session: true
    }, function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
            var User = connection.model('User', models.User, 'users');
            // find the user in the database based on their facebook id
            User.findOne({ 'email': email }, function(err, user) {

                if (err) return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    
                    // create a new user if not set
                    var newUser = new User();
                    console.log(email);
                    newUser.email = email;
                    newUser.name = "No name";
                    newUser.password = newUser.generateHash(password)

                    console.log(newUser);

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err) throw err;
                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        var User = connection.model('User', models.User, 'users');

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email':  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err) return done(err);

            if(user){
                if (!user.validPassword(password)) done(new Error("Wrong Passwor")); 
                // all is well, return successful user
                return done(null, user);       
            }else{
                done(new Error("No user found"));
            }
        });

    }));

  // set up passport strategies
  passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        enableProof: false,
        scope: ['email'],
        profileFields: ['id', 'displayName', 'emails', 'picture']
    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            var User = connection.model('User', models.User, 'users');
            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    
                    // create a new user if not set
                    var newUser = new User();

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.name  = profile.displayName;
                    newUser.email = profile.emails[0].value;
                    newUser.photo_url = 'http://graph.facebook.com/' + profile.id + '/picture';

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err) throw err;
                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));

  passport.serializeUser(function(user, done) {
      done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
        done(null, obj);
  });  

};
