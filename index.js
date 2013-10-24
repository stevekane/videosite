var http = require('http')
  , path = require('path')
  , fs = require('fs')
  , express = require('express')
  , cons = require('consolidate')
  , handlebars = require('handlebars')
  , passport = require('passport')
  , mongoose = require('mongoose')
  , braintree = require('braintree')
  , Q = require('q')
  , callWithPromise = Q.ninvoke

var routes = require('./routes')
  , configurePassport = require('./app/config/passport').configure
  , configureMongoose = require('./app/config/mongoose').configure
  , configureUserRoutes = require('./routes/user').configure
  , configurePaymentRoutes = require('./routes/payment').configure
  , configureAdminRoutes = require('./routes/admin').configure
  , configureTestRoutes = require('./routes/test').configure
  , configureEmailRoutes = require('./routes/email').configure;

var btConfig = require('./config.json').braintree
  , gateway = braintree.connect({
      environment: braintree.Environment.Sandbox,
      merchantId: btConfig.merchantId,
      publicKey: btConfig.publicKey,
      privateKey: btConfig.privateKey
  });

var sgConfig = require('./config.json').sendgrid
  , sendgrid = require('sendgrid')(sgConfig.api_user, sgConfig.api_key);


var app = express()
  , SESSION_CONFIG = { secret: "super sekrit" }
  , server = http.createServer(app);

// some standard stuff
app.engine('handlebars', cons.handlebars);

app.set('port', process.env.PORT || 3000)
  .set('views', path.join(__dirname + "/views/"))
  .set('view engine', 'handlebars')
  .set('sendgrid', sendgrid);

app.use(express.favicon())
  .use(express.methodOverride())
  .use(express.bodyParser())
  .use(express.cookieParser())
  .use(express.session(SESSION_CONFIG))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(__dirname + "/public"));


configureMongoose(mongoose);
configurePassport(passport);
configureUserRoutes(app, passport);
configurePaymentRoutes(app, gateway);
configureAdminRoutes(app);
//TODO: FOR TESTING
configureTestRoutes(app);
configureEmailRoutes(app);
//TODO: FOR TESTING


//serve the web app yo
app.get('/', routes.index);

callWithPromise(server, "listen", app.get('port'))
.then(function () { console.log('server connected on', app.get('port'));})
.fail(function () { console.log('failed to connect on port', app.get('port'));})
.done();
