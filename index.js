var http = require('http')
  , path = require('path')
  , fs = require('fs')
  , express = require('express')
  , cons = require('consolidate')
  , passport = require('passport')
  , mongoose = require('mongoose')
  , customerIO = require('customer.io')
  , Q = require('q');

var routes = require('./routes')
  , configurePassport = require('./app/config/passport').configure
  , configureMongoose = require('./app/config/mongoose').configure
  , configureUserRoutes = require('./routes/user').configure;

var callWithPromise = Q.ninvoke
  , cioConfig = require('./config.json').customerIO
  , cio = customerIO.init(cioConfig.id, cioConfig.token)
  , app = express()
  , server = http.createServer(app);

var SESSION_CONFIG = {
  secret: "super sekrit",
}

// some standard stuff
app.engine('handlebars', cons.handlebars);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + "/views/"));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session(SESSION_CONFIG));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));

configureMongoose(mongoose);
configurePassport(passport);
configureUserRoutes(app, passport, cio);

//serve the web app yo
app.get('/', routes.index);

callWithPromise(server, "listen", app.get('port'))
.fail(function () {
  console.log('failed to connect on port', app.get('port'));
})
.then(function () {
  console.log('server connected on', app.get('port'));
})
.done();
