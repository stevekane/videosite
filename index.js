var http = require('http')
  , express = require('express')
  , passport = require('passport')
  , configurePassport = require('./config/passport').configure
  , configureAppRoutes = require('./routes/app');

var passport = configurePassport(passport);

//load configurations
var config = require('./config.json');

//configure express
var app = express()
  , SESSION_CONFIG = { secret: config.session.secret }
  , server = http.createServer(app);

//set some values on the "global" express app object
app.set('port', process.env.PORT || 3000);

//configure middleware stack for express
app.use(express.favicon())
  .use(express.methodOverride())
  .use(express.bodyParser())
  .use(express.cookieParser())
  .use(express.session(SESSION_CONFIG))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(__dirname + "/public"));

configureAppRoutes(app);

//start the server
server.listen(app.get('port'), function (err) {
  console.log("connected!");
});
