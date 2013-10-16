var User = require('../app/models').User
  , verifyAuth = require('../app/config/passport').verifyAuth
  , CustomerIO = require('customer.io')
  , Q = require('q')
  , callWithPromise = Q.ninvoke;

function formatDbResponse (model) {
  var formattedModel = model.toObject();

  formattedModel.id = formattedModel._id;
  delete formattedModel.password;
  delete formattedModel._id;
  delete formattedModel.__v;
  return {user: formattedModel};
}

function editUser (req, res, next) {
  var updatedInfo = req.body;
  delete updatedInfo._id;
  delete updatedInfo.__v;
  //TODO: add email change, needs to switch old customer.io email to new, updating
  
  //TODO: fix password hashing on modify, then remove this
  delete updatedInfo.password;
  
  callWithPromise(User, "findOneAndUpdate", {_id: req.body.id}, {$set: updatedInfo})
  .then(function (user) {
    var response = {};
    response.user = user 
      ? formatDbResponse(user) 
      : null;
    res.send(response);
  })
};

//used to send errors from promise .fail hooks
function handleFailure (res, error) {
  return function (err) {
    console.log('handleFailure', error);
    return res.status(400).send({
      error: error ? error : err
    });
  }
}

//utility function to send an error 
function sendError (res, error) {
  return res.status(400).send({error: error});
}

function checkForExistingUser (User, data) {
  console.log('checkForExisting');
  return callWithPromise(User, "findOne", data);
}

//closure gives access to req, res objects
function handleExistingUser (req, res) {
  console.log('handleExisting');
  return function (user) {
    if (user) { return sendError(res, "User already exists"); }
  }
}

function createNewUser (User, data) {
  console.log('createNew');
  return callWithPromise(User, "create", data);
}

function returnNewUser (req, res) {
  return function (user) {
    return res.json(formatDbResponse(user)); 
  }
}

function registerWithCustomerIO (cio) {
  return function (user) {
    cio.identify(user._id, user.email);
    return user;
  }
}

//closure gives access to our customer.io object
function processNewUser (cio) {

  return function processNewUser (req, res) {
    var data = {
     username: req.body.user.username,
     password: req.body.user.password,
     email: req.body.user.email
    }; 

    checkForExistingUser(User, {username: data.username})
    .fail(handleFailure(res, "Server error while handling new user."))
    .then(function (user) {
      if (user) { return handleExistingUser(req, res); }

      createNewUser(User, data)
      .fail(handleFailure(res, "Server error while creating new user."))
      .then(registerWithCustomerIO(cio))
      .then(returnNewUser(req, res))
      .done();
    })
    .done()
  }
}

function login (req, res) {
  return res.json({user: formatDbResponse(req.user)});
}

function logout (req, res) {
  req.logout();
  res.status(200).send("logged out successfully");
}

exports.configure = function (app, passport, cio, options) {
  app.post('/users', processNewUser(cio));
  app.post('/user/create', processNewUser(cio));
  app.post('/user/login', passport.authenticate('local'), login);
  app.all('/user/logout', verifyAuth, logout);
  app.post('/user/edit', verifyAuth, editUser);
}
