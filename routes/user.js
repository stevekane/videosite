var _ = require('lodash')
  , bcrypt = require('bcrypt')
  , Q = require('q')
  , User = require('../data_models/user').User
  , formatUser = require('../data_models/utilities').formatWithKey("user")
  , sendError = require('../utils/http').sendError
  , sendConfirmation = require('../utils/http').sendConfirmation
  , compileAndSendEmail = require('../libs/email').compileAndSendEmail
  , callWithPromise = Q.ninvoke
  , SALT_WORK_FACTOR = 10;

var processNewUser = require('../system_behaviors/manage_users/process_new_user');
var processChangeEmail = require('../system_behaviors/manage_users/process_change_email');
var login = require('../system_behaviors/manage_sessions/login');
var logout = require('../system_behaviors/manage_sessions/logout');

//We use a Q.defer here to allow us to throw or resolve the callback from login
var loginUser = _.curry(function (req, user) {
  var loginPromise = Q.defer();

  req.login(user, function (err) {
    if (err) {
      loginPromise.reject(new Error("Login Unsuccessful."));
    } else {
      loginPromise.resolve(user); 
    } });
  return loginPromise.promise;
});


function confirmAuthentication (req, res) {
  return sendConfirmation(res);
}

function comparePasswords (incoming, current) {
  return callWithPromise(bcrypt, "compare", incoming, current);
}

function checkIfMatches(isMatch){
  if (!isMatch) { 
    throw new Error("Incorrect Password.");
  } 
  return isMatch;
}

//not curried as the inner function takes no args
function hashPassword (newPassword, salt) {
  return function () {
    return callWithPromise(bcrypt, "hash", newPassword, salt);
  }
}

var updateUserPassword =  _.curry(function (id, password) {
  return callWithPromise(User, "findOneAndUpdate", {_id: id}, {$set: {password: password}}) 
});

function restoreSession (req, res) {
  if (req.user && req.isAuthenticated()) {
    return res.status(200).json(formatUser(req.user)); 
  } else {
    return res.send(204);
  }
}

function handleInvalidUser (user) {
  if (!user) { 
    throw new Error("No User Found by that name.");
  }
  return user;
}

var processPasswordChange = _.curry(function (req, res) {
  var incomingPassword = req.body.oldpassword
    , newPassword = req.body.password;

  comparePasswords(incomingPassword, req.user.password)
  .then(checkIfMatches)
  .then(hashPassword(newPassword, SALT_WORK_FACTOR))
  .then(updateUserPassword(req.user._id))
  .then(returnUser(res))
  .fail(sendError(res))
  .done();
});

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
  .then(hashPassword(newPassword, SALT_WORK_FACTOR))
  .then(updateUserPassword(userId))
  .then(sendConfirmation(res))
  .fail(sendError(res))
  .done();
});


exports.configure = function (app, options) {
  var sendgrid = app.get('sendgrid')
    , passport = app.get('passport')
    , emailTemplates = app.get('emailTemplates');

  //sessions
  app.post('/user/login', passport.authenticate('local'), login);
  app.all('/user/logout', logout);
  app.post('/user/authenticated', passport.verifyAuth, confirmAuthentication); 
  app.get('/user/restore', restoreSession); 

  //user crud/lifecycle
  app.post('/users', processNewUser(sendgrid, emailTemplates.subscribe));
  app.post('/user/create', processNewUser(sendgrid, emailTemplates.subscribe));
  app.put('/user/edit', passport.verifyAuth, processChangeEmail);
  app.post('/user/pwchange', passport.verifyAuth, processPasswordChange);
  //app.post('/user/pwresetrequest', processPasswordResetRequest);
  //app.get('/user/pwreset/:id', processPasswordReset);

  return app;
}
