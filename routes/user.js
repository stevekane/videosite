var User = require('../app/models').User
  , verifyAuth = require('../app/config/passport').verifyAuth
  , Q = require('q')
  , callWithPromise = Q.ninvoke
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10
  , Moment = require('moment');

function formatResponse (hash) {
  return response = {
    user: {
      id: hash._id,
      password: hash.password,
      email: hash.email
    }
  };
}

function formatDbResponse (model) {
  var formattedModel = model.toObject();

  formattedModel.id = formattedModel._id;
  delete formattedModel.password;
  delete formattedModel._id;
  delete formattedModel.__v;
  return {user: formattedModel};
}


//used to send errors from promise .fail hooks
function handleFailure (res) {
  return function (err) {
    console.log("handleFailure", err);
    var message = (err instanceof Error)
      ? err.message
      : err;

    return res.status(400).send({error: message});
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

function checkForExistingUserById(User, id){
  return callWithPromise(User, "findById", id);
}


//returns rejected promise if user else returns resolved promise
function handleExistingUser (user) {
  console.log('handleExisting', user);
  var deferred = Q.defer();

  if (user) { 
    deferred.reject(new Error('Email already exists.'));
  } else { 
    deferred.resolve();
  }
  return deferred.promise;
}

function createNewUser (User, data) {
  return function (result) {
    console.log('createNewUser', result);
    return callWithPromise(User, "create", data);
  }
}

function returnNewUser (req, res) {
  console.log('returnNewUser');
  return function (user) {
    return res.json(formatDbResponse(user)); 
  }
}

function returnUpdatedUser(req, res){
  return function(user){
    return res.json(formatDbResponse(user));
  }
}

function registerWithCustomerIO (cio) {
  return function (user) {
    console.log('registerWithCIO', user, "user");
        
    //timestamp of creation (linux timestamp 'X')
    var timeCreated = moment().format('X');
    
    cio.identify(user._id, user.email, {created_at: timeCreated});
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
    cio.identify(user._id, user.email);
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
    .then(returnNewUser(req, res))
    .fail(handleFailure(res))
    .done();
  }
}

function handleExistingEmail(user){
  var deferred = Q.defer();

  if (user) { 
    deferred.reject(new Error('Email already exists in system'));
  } else { 
    return deferred.resolve();
  }
  return deferred.promise;

}

function processEditUser (cio) {
  return function (req, res) {
    console.log("processedit");
    var data = req.body.user;

    callWithPromise(User, "findOne", {email: data.email})
    .then(handleExistingEmail)
    .then(editUserInfo(User, data))
    .then(updateWithCustomerIO(cio))
    .then(sendUpdatedAccountInfoNotification(cio))
    .then(returnUpdatedUser(req,res))
    .fail(handleFailure(res))
    .done();
  }
}

function login (req, res) {
  return res.json(formatDbResponse(req.user));
}

function logout (req, res) {
  req.logout();
  res.status(200).send("logged out successfully");
}

function isAuthenticated (req,res) {
  return res.status(200).send();
}

function comparePasswords (incoming, current) {
  return callWithPromise(bcrypt, "compare", incoming, current);
}

function checkIfMatches(isMatch){
  var deferred = Q.defer();

  if (!isMatch) { 
    deferred.reject(new Error('Bad password'));
  } else { 
    deferred.resolve();
  }
  return deferred.promise;
}

function hashPassword (newPassword, salt) {
  console.log("hashpassword", newPassword, salt);
  return function(){
    return callWithPromise(bcrypt, "hash", newPassword, salt);
  }
}

function updateUserPassword (id) {
  return function(hash){
    console.log("HASH: ", hash, id);
    return callWithPromise(User, "findOneAndUpdate", {_id: id}, {$set: {password: hash}}) 
  }
}

//TODO: SHOULD THE ANON FUNCTION HERE USE FORMAT BEFORE SENDING??
function allowPasswordChange (req,res) {
  var incomingPassword = req.body.oldpassword;
  var newPassword = req.body.password;

  comparePasswords(incomingPassword, req.user.password)
  .then(checkIfMatches)
  .then(hashPassword(newPassword, SALT_WORK_FACTOR))
  .then(updateUserPassword(req.user._id))
  .then(function(user){res.status(200).send(user)})
  .fail(handleFailure(res))
  .done();
}

//NOTE: THIS USES FORMAT RESPONSE WHICH IS SLIGHTLY DIFF THAN FORMATDBRESPONSE
function restoreSession (req, res) {
  if (req.user && req.isAuthenticated()) {
    res.status(200).json(formatResponse(req.user)); 
  } else {
    res.status(204).send(); 
  }
}

function handleInvalidUser(user){
  var deferred = Q.defer();
  console.log ("USER: ", user);
  if (!user) { 
    deferred.reject(new Error('Invalid Username'));
  } else { 
    deferred.resolve(user);
  }
  return deferred.promise;
}

function sendPasswordChangeRequest(cio){
  return function(user){
    console.log("sending pw change req email");
    cio.track(user.id, 'account_modification',
              {account_action: 'request_pw_change'})
    return user;
  }
}

function sendPasswordChangeNotification(cio, newPassword){
  return function(user){
    console.log("sending pw changed email", newPassword);
    cio.track(user.id, 'account_modification',
              {account_action: 'pw_change_complete',
               temp_password: newPassword})
  }
}

function processPasswordChangeRequest(cio){
  return function (req, res) {
    var data = req.body;
    console.log(data);
    checkForExistingUser(User, {email: data.email})
    .then(handleInvalidUser)
    .then(sendPasswordChangeRequest(cio))
    .then(function(){res.status(200).send()})
    .fail(handleFailure(res))
    .done();
  }
}

function processPasswordChange(cio){
  return function(req, res){
  
    var userId = req.params.id;
    
    console.log("id: ", userId);
    var newPassword = Math.random().toString(36).slice(-8);
    
    checkForExistingUserById(User, userId)
    .then(handleInvalidUser)
    .then(hashPassword(newPassword, 10))
    .then(updateUserPassword(userId))
    .then(sendPasswordChangeNotification(cio, newPassword))
    .then(function(){res.status(200).send()})
    .fail(handleFailure(res))
    .done();
  }  
}


exports.configure = function (app, passport, cio, options) {
  app.post('/users', processNewUser(cio));
  app.post('/user/create', processNewUser(cio));
  app.post('/user/login', passport.authenticate('local'), login);
  app.all('/user/logout', logout);
  app.post('/user/authenticated', verifyAuth, isAuthenticated); 
  app.get('/user/restore', restoreSession); 
  app.put('/user/edit', verifyAuth, processEditUser(cio));
  app.post('/user/pwchange', verifyAuth, allowPasswordChange);
  app.post('/user/pwresetrequest', processPasswordChangeRequest(cio));
  app.get('/user/pwreset/:id', processPasswordChange(cio));

  return app;

}
