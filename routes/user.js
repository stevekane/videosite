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

function checkForExistingUserById(User, id){
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

function createNewUser (User, data) {
  return function (result) {
    console.log('createNewUser', result);
    return callWithPromise(User, "create", data);
  }
}

function returnUser(res) {
  return function (user) {
    return res.json(formatUser(user));
  }
}

function registerWithCustomerIO (cio) {
  return function (user) {
    console.log('registerWithCIO', user, "user");
    cio.identify(user._id, user.email, {created_at: user.created_at});
    return user;
  }
}

function sendNewUserEmail(cio){
  return function(user){
    console.log('sending new user email')
    cio.track(user.id, 'account_created', {
      subscription_level: 'new_account'
    });
    return user;
  }
}

function sendUpdatedAccountInfoNotification(cio){
  return function(user){
    console.log('sending user email notifying acct change')
    cio.track(user.id, 'email_changed')
    return user;
  }
}

function loginUser (req) {
  return function (user) {
    console.log('loginUser');
    req.login(user, function (err) {
      console.log("login error", err); 
    });
    return user;
  }
}

//update and create w customer.io are actually the same
function updateWithCustomerIO (cio) {
  return function (user) {
    console.log("user: ", user);
    user.updated_at_timestamp("Edit Email");
    cio.identify(user._id, user.email, {
      updated_at: user.updated_at,
      last_action: user.last_modified_action
    });
    return user;
  }
}

function editUserInfo(User, data){
  return function(){
    var updatedInfo = {email: data.email};
    return callWithPromise(User, "findOneAndUpdate", {_id: data.id}, {$set: updatedInfo});
  }
}

function processNewUser (cio) {

  return function (req, res) {
    var data = req.body.user;

    checkForExistingUser(User, {email: data.email})
    .then(handleExistingUser)
    .then(createNewUser(User, data))
    .then(registerWithCustomerIO(cio))
    .then(sendNewUserEmail(cio))
    .then(loginUser(req))
    .then(returnUser(res))
    .fail(sendError(res))
    .done();
  }
}

function processEditUser (cio) {
  return function (req, res) {
    
    var data = req.body.user;
   
    callWithPromise(User, "findOne", {email: data.email})
    .then(handleExistingUser)
    .then(editUserInfo(User, data))
    .then(updateWithCustomerIO(cio))
    .then(sendUpdatedAccountInfoNotification(cio))
    .then(returnUser(res))
    .fail(sendError(res))
    .done();
  }
}

function login (req, res) {
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

function hashPassword (newPassword, salt) {
  console.log("hashpassword", newPassword, salt);
  return function () {
    return callWithPromise(bcrypt, "hash", newPassword, salt);
  }
}

function updateUserPassword (id) {
  return function (hash) {
    return callWithPromise(User, "findOneAndUpdate", {_id: id}, {$set: {password: hash}}) 
  }
}

//TODO: SHOULD THE ANON FUNCTION HERE USE FORMAT BEFORE SENDING??
function allowPasswordChange (req, res) {
  var incomingPassword = req.body.oldpassword;
  var newPassword = req.body.password;

  comparePasswords(incomingPassword, req.user.password)
  .then(checkIfMatches)
  .then(hashPassword(newPassword, SALT_WORK_FACTOR))
  .then(updateUserPassword(req.user._id))
  .then(returnUser(res))
  .fail(sendError(res))
  .done();
}

//NOTE: THIS USES FORMAT RESPONSE WHICH IS SLIGHTLY DIFF THAN FORMATDBRESPONSE
function restoreSession (req, res) {
  if (req.user && req.isAuthenticated()) {
    return res.status(200).json(formatUser(req.user)); 
  } else {
    return sendConfirmation(res);
  }
}

function handleInvalidUser (user) {
  if (!user) { 
    throw new Error("No User Found by that name.");
  }
  return user;
}

//curry to allow partial application in promise chain
var sendPasswordChangeRequest = _.curry(function (cio, user) {
  console.log("sending pw change req email");
  cio.track(user.id, 'account_modification', {
    account_action: 'request_pw_change'
  });
  return user;
});

//curry to allow partial application in promise chain
var sendPasswordChangeNotification = _.curry(function (cio, newPassword, user){
  console.log("sending pw changed email", newPassword);
  cio.track(user.id, 'account_modification', {
    account_action: 'pw_change_complete',
    temp_password: newPassword
  });
});

function processPasswordReset (cio) {
  return function (req, res) {
    var data = req.body;
    checkForExistingUser(User, {email: data.email})
    .then(handleInvalidUser)
    .then(sendPasswordChangeRequest(cio))
    .then(sendConfirmation(res))
    .fail(sendError(res))
    .done();
  }
}

function processPasswordChange (cio) {
  return function(req, res){
  
    var userId = req.params.id;
    var newPassword = Math.random().toString(36).slice(-8);
    
    checkForExistingUserById(User, userId)
    .then(handleInvalidUser)
    .then(hashPassword(newPassword, 10))
    .then(updateUserPassword(userId))
    .then(sendPasswordChangeNotification(cio, newPassword))
    .then(sendConfirmation(res))
    .fail(sendError(res))
    .done();
  }  
}


exports.configure = function (app, passport, cio, options) {
  app.post('/users', processNewUser(cio));
  app.post('/user/create', processNewUser(cio));
  app.post('/user/login', passport.authenticate('local'), login);
  app.all('/user/logout', logout);
  app.post('/user/authenticated', verifyAuth, confirmAuthentication); 
  app.get('/user/restore', restoreSession); 
  app.put('/user/edit', verifyAuth, processEditUser(cio));
  app.post('/user/pwchange', verifyAuth, allowPasswordChange);
  app.post('/user/pwresetrequest', processPasswordReset(cio));
  app.get('/user/pwreset/:id', processPasswordChange(cio));

  return app;

}
