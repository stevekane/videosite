var http = require('http')
  , path = require('path')
  , fs = require('fs')
  , express = require('express')
  , cons = require('consolidate')
  , redis = require('redis').createClient()
  , RedisExpress = require('connect-redis')(express)
  , routes = require('./routes')
  , server
  , app = express();

var gaurdedTypes = [
  '.mp4', 
  '.ogg',
  '.webm'
];

//partial application
function inArray (array, value) {
  return function (value) {
    return (array.indexOf(value) !== -1); 
  }
}

var isGaurdedType = inArray(gaurdedTypes);

function videoAuth (req, res, next) {
  var url = req.url
    , ext = path.extname(url);

  if (isGaurdedType(ext)) {
    console.log('this is a guarded type', ext);   
    //res.send(404, "not allowed to have this bra");
    next();
  } else {
    next();
  }
}


// some standard stuff
app.engine('handlebars', cons.handlebars)
  .set('port', process.env.PORT || 3000)
  .set('redis', redis)
  .set('views', path.join(__dirname + "/views/"))
  .set('view engine', 'handlebars')
  .use(express.favicon())
  .use(express.bodyParser())
  .use(express.methodOverride())
  .use(express.cookieParser('your secret here'))
  .use(videoAuth)
  .use(express.static(__dirname + "/public"))
  .use(express.session({
    secret: "super sekrit",
    key: 'key',
    store: new RedisExpress({ client: redis })
  }));


app.get('/', routes.index);

server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('server connected on ', app.get('port'));
});
