/**
 *
 * Main Script ran on Heroku
 *
 */

var express = require('express'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	routes = require('./routes'),
	cookieParser = require('cookie-parser'),
	cors = require('cors'),
	api = require('./api');
	http = require('http'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	util = require('util'),
	passport = require('passport'),
	mongoose = require('mongoose');

var corsOptions = {
  origin: process.env.PORT || 'http://localhost:3000'
};

var app = express();

app.set('port', process.env.PORT || 3000  );
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
// app.use(session({ secret: process.env.SESSIONSECRET }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(__dirname + '/public'));

// Configure the errors
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// connect to the db
var mongoUri = process.env.MONGOHQ_URL
  || "mongodb://localhost/projectHunt";

// mongoose.connect(mongoUri);
var connection = mongoose.createConnection(mongoUri);

// log on mongo connection error
connection.on('error', console.error.bind(console,
  'connection error:'));

// log on connection open
connection.once('open', function () {
  console.info('connected to database')
});

// Error functions
function logErrors(err, req, res, next) {
  console.error('logErrors', err.toString());
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  console.error('clientErrors ', err.toString());
  res.send(500, { error: err.toString()});
  if (req.xhr) {
    console.error(err);
    res.send(500, { error: err.toString()});
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  console.error('lastErrors ', err.toString());
  res.send(500, {error: err.toString()});
}

// Set up routes by passing the app and connection to the mongoDB
api(app, connection);

// Start the server
http.createServer(app);

// Start listening on the given port
app.listen(app.get('port'), function(){
 console.info('Express server listening on port '
   + app.get('port'));
});
