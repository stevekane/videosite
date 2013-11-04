var http = require('http')
  , express = require('express')
  , passport = require('passport')
  , configurePassport = require('./config/passport').configure
  , configureAppRoutes = require('./routes/app')
  , configureUserRoutes = require('./routes/user')
  , config = require('./config/config.json');

//WE ARE USING EXPRESS AND PASSPORT AS OUR ONLY "hard dependencies"
var app = express()
  , SESSION_CONFIG = { secret: config.session.secret }
  , server = http.createServer(app);

app.set('port', process.env.PORT || 3000)
  .set("passport", passport);

app.use(express.favicon())
  .use(express.methodOverride())
  .use(express.bodyParser())
  .use(express.cookieParser())
  .use(express.session(SESSION_CONFIG))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(__dirname + "/public"));

//NOTE: configure passport mutates the passport object
configurePassport(passport);
configureAppRoutes(app);
configureUserRoutes(app);

server.listen(app.get('port'), function (err) {
  console.log("connected!");
});