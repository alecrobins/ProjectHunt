/**
 *
 * Main Script ran on Heroku
 *
 */

var express = require('express'),
  routes = require('./routes'),
  api = requie('./api');
  http = require('http'),
  util = require('util'),
  oauth = require('oauth'),
  querystring = require('querystring'),
  mongoose = require('mongoose');

var app = express();

// Configure the express app
app.configure(function(){
  app.set('port', process.env.PORT || 3000  );
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  // app.use(express.cookieParser('asd;lfkajs;ldfkj'));
  // app.use(express.session({
  //   secret: '<h1>WHEEYEEE</h1>',
  //   key: 'sid',
  //   cookie: {
  //     secret: true,
  //     expires: false
  //   }
  // }));

  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

// Configure the errors
app.configure(function() {
  app.use(logErrors);
  app.use(clientErrorHandler);
  app.use(errorHandler);
});

// connect to the db
var mongoUri = process.env.MONGOHQ_URL
  || "mongodb://localhost/projectHunt";

mongoose.connect(mongoUri);
var connection = mongoose.createConnection(dbUrl);

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
