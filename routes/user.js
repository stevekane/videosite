var _ = require('lodash')
  , bcrypt = require('bcrypt')
  , Moment = require('moment')
  , Q = require('q')
  , User = require('../app/models').User
  , verifyAuth = require('../app/config/passport').verifyAuth
  , formatUser = require('../app/utils/database').formatWithKey("user")
  , sendError = require('../app/utils/http').sendError
  , sendConfirmation = require('../app/utils/http').sendConfirmation
  , format = require('../app/utils/database').format
  , callWithPromise = Q.ninvoke
  , SALT_WORK_FACTOR = 10;

function checkForExistingUser (User, data) {
  console.log('checkForExisting');
  return callWithPromise(User, "findOne", data);
}

function checkForExistingUserById (User, id){
  console.log('checkForExistingUserById');
  return callWithPromise(User, "findById", id);
}


//returns rejected promise if user else returns resolved promise
function handleExistingUser (user) {
  console.log('handleExistingUser.  User -> ', user);
  if (user) { 
    throw new Error("User already exists!");
  }
  return user;
}

//not curried since inner function takes no parameters
function createNewUser (User, data) {
  return function () {
    console.log('createNewUser');
    return callWithPromise(User, "create", data);
  }
}

var returnUser = _.curry(function (res, user) {
  return res.json(formatUser(user));
});


//We use a Q.defer here to allow us to throw or resolve the callback from login
var loginUser = _.curry(function (req, user) {
  console.log('loginUser');
  var loginPromise = Q.defer();

  req.login(user, function (err) {
    if (err) {
      loginPromise.reject(new Error("Login Unsuccessful."));
    } else {
      loginPromise.resolve(user); 
    }
  });
  return loginPromise.promise;
});


//Not curried as inner function takes no params
function editUserInfo(User, data){
  return function () {
    var updatedInfo = {email: data.email};
    return callWithPromise(User, "findOneAndUpdate", {_id: data.id}, {$set: updatedInfo});
  }
}

function login (req, res) {
  console.log('login');
  return res.json(formatUser(req.user));
}

function logout (req, res) {
  req.logout();
  res.status(200).send("logged out successfully");
}

function confirmAuthentication (req, res) {
  return sendConfirmation(res);
}

function comparePasswords (incoming, current) {
  return callWithPromise(bcrypt, "compare", incoming, current);
}

function checkIfMatches(isMatch){
  console.log("checkIfMatches");
  if (!isMatch) { 
    throw new Error("Incorrect Password.");
  } 
  return isMatch;
}

//not curried as the inner function takes no args
function hashPassword (newPassword, salt) {
  console.log("hashpassword", newPassword, salt);
  return function () {
    return callWithPromise(bcrypt, "hash", newPassword, salt);
  }
}

var updateUserPassword =  _.curry(function (id, hash) {
  console.log("updateUserPassword");
  return callWithPromise(User, "findOneAndUpdate", {_id: id}, {$set: {password: hash}}) 
});

function restoreSession (req, res) {
  console.log("restoreSession");
  if (req.user && req.isAuthenticated()) {
    return res.status(200).json(formatUser(req.user)); 
  } else {
    return res.send(204);
  }
}

function handleInvalidUser (user) {
  console.log("handleInvalidUser");
  if (!user) { 
    throw new Error("No User Found by that name.");
  }
  return user;
}

var refreshSession = _.curry(function (req, user) {
  var loginPromise = Q.defer();

  req.logout();
  req.login(user, function (err) {
    if (err) {
      loginPromise.reject(new Error("login failed.  ndb bro"));
    } else {
      loginPromise.resolve(user); 
    }
  });
  return loginPromise.promise;
});

var processNewUser = _.curry(function (req, res) {
  var data = req.body;

  checkForExistingUser(User, {email: data.email})
  .then(handleExistingUser)
  .then(createNewUser(User, data))
  .then(loginUser(req))
  .then(returnUser(res))
  .fail(sendError(res))
  .done();
});

var processChangeEmail = _.curry(function (req, res) {
  var data = req.body.user;

  callWithPromise(User, "findOne", {email: data.email})
  .then(handleExistingUser)
  .then(editUserInfo(User, data))
  .then(refreshSession(req))
  .then(returnUser(res))
  .fail(sendError(res))
  .done();
});

function processPasswordChange (req, res) {
  var incomingPassword = req.body.oldpassword
    , newPassword = req.body.password;

  comparePasswords(incomingPassword, req.user.password)
  .then(checkIfMatches)
  .then(hashPassword(newPassword, SALT_WORK_FACTOR))
  .then(updateUserPassword(req.user._id))
  .then(returnUser(res))
  .fail(sendError(res))
  .done();
}

var processPasswordResetRequest = _.curry(function (req, res) {
  checkForExistingUser(User, {email: req.body.email})
  .then(handleInvalidUser)
  .then(sendConfirmation(res))
  .fail(sendError(res))
  .done();
});

var processPasswordReset = _.curry(function (req, res) {
  var userId = req.params.id
    , newPassword = Math.random().toString(36).slice(-8);
  
  checkForExistingUserById(User, userId)
  .then(handleInvalidUser)
  .then(hashPassword(newPassword, 10))
  .then(updateUserPassword(userId))
  .then(sendConfirmation(res))
  .fail(sendError(res))
  .done();
});


exports.configure = function (app, passport, options) {
  app.post('/users', processNewUser);
  app.post('/user/create', processNewUser);
  app.post('/user/login', passport.authenticate('local'), login);
  app.all('/user/logout', logout);
  app.post('/user/authenticated', verifyAuth, confirmAuthentication); 
  app.get('/user/restore', restoreSession); 
  app.put('/user/edit', verifyAuth, processChangeEmail);
  app.post('/user/pwchange', verifyAuth, processPasswordChange);
  //app.post('/user/pwresetrequest', processPasswordResetRequest);
  //app.get('/user/pwreset/:id', processPasswordReset);

  return app;
}
