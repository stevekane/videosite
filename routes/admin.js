var admincreds = require('./../config.json').admin
,   hbs = require('handlebars')
,   Q = require('q')
,   callWithPromise = Q.ninvoke
, User = require('../app/models').User
, braintree = require('braintree')
, customerIO = require('customer.io')
, request = require('request');
//npm install w save if works

var cioConfig = require('./../config.json').customerIO
  , cio = customerIO.init(cioConfig.id, cioConfig.token);

var btConfig = require('./../config.json').braintree
  , gateway = braintree.connect({
      environment: braintree.Environment.Sandbox,
      merchantId: btConfig.merchantId,
      publicKey: btConfig.publicKey,
      privateKey: btConfig.privateKey
  });
;

hbs.registerHelper('list', function(items, options) {
  // var out = "<div class = 'row'>";
   
   var out = "<ul>";
   
  if(items){
    for(var i=0, l=items.length; i<l; i++) {
      //out = out + "<div class = 'col-md-6'>" + options.fn(items[i]) + "</div>";
      out = out + "<li>" + options.fn(items[i]) + "</li>";
      //out = out + options.fn(items[i]);
    }
  }
  out = out + "</ul>";
  return out;
});

function logOnAsAdmin (req, res) {
  res.render('admin_login'); 
}

var checkAdminCredentials = function(req, res){
  var userValid = (req.body.username === admincreds.username);
  var passwordValid = (req.body.password === admincreds.password);
  
  if (userValid && passwordValid){
    res.send(200);    
  } else
    res.status(401).send("Unauthorized Attempt");      
}


function requestCioUserList(){
  //authorization for CIO API Endpoint
  var cioAuth = 'Basic ' + new Buffer(cioConfig.id + ':' + cioConfig.token).toString('base64');
  var cioOptionsHash = {
      url:"https://manage.customer.io/api/v1/customers", 
      headers: {
          'Authorization': cioAuth ,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
  console.log("request");
  return callWithPromise(request, "get", cioOptionsHash);
}

var parseCioUserList = function(results){  
  console.log("RESS", results);
  var cioResponse = JSON.parse(results[0].body);
  var users = cioResponse.customers;
  var cioUserList = [];
  for(var i = 0; i < users.length; i++){
    cioUserList[i] = {id: users[i].id, name: users[i].attributes.email}
  }
  console.log(cioUserList);
  return cioUserList;
}


var parseMongoResults = function(results){
  var mongoUsers = [];
  
  for(var i = 0; i< results.length; i++){
    console.log(results[i].id);
    mongoUsers[i] = {name: results[i].email, id: results[i].id};
  }  
  return mongoUsers;
}


var processValidAdmin = function(req, res){
  var cioUserList = null
  ,   mongoUserList = null;
  
  Q.all([requestCioUserList, callWithPromise(User, "find", {})])
  .then(function(results){
    //cioUserList = parseCioUserList(results[0]);
    console.log(results[0]);
    mongoUserList = parseMongoResults(results[1]);
    res.render('adminpage',cioUserList);
    
  }).fail(function(err){
    console.log("error", err);
    res.send(404);
  })
  .done();
  
  // .then(parseCioUserList())
  // .then(getMongoDbUserList())
  //.then(sendResponseToClient(req,res))
  // .fail(function(err){
    // console.log("failed", err);
    // res.send(404);
    
  // })
  // .done();
}

exports.configure = function (app) {
  app.get("/admin", logOnAsAdmin);
  app.post("/admin/login", checkAdminCredentials);
  app.get("/admin/console", processValidAdmin);
  return app;
}

//needs auth session, might need a diff passport strat
