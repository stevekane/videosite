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
app.engine('handlebars', cons.handlebars)
  .set('port', process.env.PORT || 3000)
  .set('views', path.join(__dirname + "/views/"))
  .set('view engine', 'handlebars')
  .use(express.favicon())
  .use(express.bodyParser())
  .use(express.methodOverride())
  .use(express.cookieParser('your secret here'))
  .use(express.static(__dirname + "/public"))
  .use(express.session(SESSION_CONFIG))
  .use(passport.initialize())
  .use(passport.session());

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
