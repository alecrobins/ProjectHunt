var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');
var models = require('../models/');

module.exports = function(connection){

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

                    console.log(profile);

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = profile.token;
                    newUser.name  = profile.displayName;
                    newUser.email = profile.emails[0].value;
                    newUser.photo_url = 'http://graph.facebook.com/' + profile.id + '/picture';

                    console.log("NEW USER");
                    console.log(newUser);

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err) throw err;
                        console.log("SUCCESSFULLY SAVED");
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
