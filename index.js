var http = require('http')
  , path = require('path')
  , fs = require('fs')
  , express = require('express')
  , cons = require('consolidate')
  , handlebars = require('handlebars')
  , passport = require('passport')
  , mongoose = require('mongoose')
  , Q = require('q')
  , callWithPromise = Q.ninvoke;

//here we create our emailTemplates
var emailTemplates = require('./compiledEmails')(handlebars);

var configurePassport = require('./config/passport').configure
  , configureMongoose = require('./config/mongoose').configure;

var configureUserRoutes = require('./routes/user').configure
  , configurePaymentRoutes = require('./routes/payment').configure
  , configureIndexRoutes = require('./routes/index').configure
  , configureEmailRoutes = require('./routes/email').configure;

//load configurations
var config = require('./config.json');

//configure stripe
var stripeConfig = config.stripe
  , stripe = require('stripe')(stripeConfig.test_api_key); 

//configure sendgrid
var sgConfig = config.sendgrid
  , sendgrid = require('sendgrid')(sgConfig.api_user, sgConfig.api_key);

//configure express
var app = express()
  , SESSION_CONFIG = { secret: config.session.secret }
  , server = http.createServer(app);

// some standard stuff
app.engine('handlebars', cons.handlebars);

//set some values on the "global" express app object
app.set('port', process.env.PORT || 3000)
  .set('views', path.join(__dirname + "/views/"))
  .set('view engine', 'handlebars')
  .set('sendgrid', sendgrid)
  .set('stripe', stripe)
  .set('passport', passport)
  .set('emailTemplates', emailTemplates);

//configure middleware stack for express
app.use(express.favicon())
  .use(express.methodOverride())
  .use(express.bodyParser())
  .use(express.cookieParser())
  .use(express.session(SESSION_CONFIG))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(__dirname + "/public"));


//configure database and session libs
configureMongoose(mongoose);
configurePassport(passport);

//load all api route handlers
configureUserRoutes(app);
configurePaymentRoutes(app);
configureIndexRoutes(app);
configureEmailRoutes(app);

//start the server
callWithPromise(server, "listen", app.get('port'))
.then(function () { console.log('server connected on', app.get('port'));})
.fail(function () { console.log('failed to connect on port', app.get('port'));})
.done();
