var User = require('../app/models').User
  , verifyAuth = require('../app/config/passport').verifyAuth
  , CustomerIO = require('customer.io')
  , Q = require('q')
  , callWithPromise = Q.ninvoke;

// CustomerIO.init(site ID, API token)
var cio = CustomerIO.init('61e69d38865a3b27286b', 'faada99ebd4a66168a02')

function formatDbResponse (model) {
  var formattedModel = model.toObject();

  formattedModel.id = formattedModel._id;
  delete formattedModel.password;
  delete formattedModel._id;
  delete formattedModel.__v;
  return formattedModel;
}

function logAndSendError (req, res) {
  return function (err) {
    console.log(err);
    return res.status(400).send({global: err});
  }
}

function createUser (req, res) {
  var searchTerms = {username: req.body.username};

  callWithPromise(User, "findOne", searchTerms)
  .fail(logAndSendError(req, res))
  .then(function (user) {
    var data = {}; 
    if (user) {
      return res.status(400).send({username: "Error: Username is already in use!"});
    }
    data.username = req.body.username;
    data.password = req.body.password;
    data.email = req.body.email;

    callWithPromise(User, "create", data)
    .fail(logAndSendError(req, res))
    .then(function (user) {
      //should this have a callback??
      cio.identify(user.id, user.email);
      return res.json(formatDbResponse(user));
    })
  });
}

function editUser(req, res){
  updatedInfo = req.body;
  delete updatedInfo._id;
  delete updatedInfo.__v;
  //TODO: add email change, needs to switch old customer.io email to new, updating
  
  //TODO: fix password hashing on modify, then remove this
  delete updatedInfo.password;
  
  callWithPromise(User, "findOneAndUpdate", {_id: req.body.id}, {$set: updatedInfo})
  .fail(logAndSendError(req, res))
  .then(function (user) {
    var response = {};
    response.user = user ? formatDbResponse(user) : null;
    res.send(response);
  })
};


function login (req, res) {
  return res.json({user: formatDbResponse(req.user)});
}

function logout (req, res) {
  req.logout();
  res.status(200).send("logged out successfully");
}

exports.configure = function (app, passport, options) {
  app.post('/user/create', createUser);
  app.post('/user/login', passport.authenticate('local'), login);
  app.all('/user/logout', verifyAuth, logout);
  app.post('/user/edit', verifyAuth, editUser);
}
