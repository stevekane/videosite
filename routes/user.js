var User = require('../app/models').User
  , verifyAuth = require('../app/config/passport').verifyAuth
  , CustomerIO = require('customer.io')
  , Q = require('q')
  , callWithPromise = Q.ninvoke
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

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

//returns rejected promise if user else returns resolved promise
function handleExistingUser (user) {
  console.log('handleExisting', user);
  var deferred = Q.defer();

  if (user) { 
    deferred.reject(new Error('User already exists.'));
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
    cio.identify(user._id, user.email);
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
    cio.identify(user._id, user.email);
    return user;
  }
}

function editUserInfo(User, data){
  //strip out the ID from info to update
  var updatedInfo = {email: data.email};
  
  return callWithPromise(User, "findOneAndUpdate", {_id: data.id}, {$set: updatedInfo})      
}

//TODO: REWORK OF PROMISE CHAIN IN PROGRESS
function processNewUser (cio) {

  return function (req, res) {
    var data = {
     password: req.body.user.password,
     email: req.body.user.email
    }; 

    checkForExistingUser(User, {email: data.email})
    .then(handleExistingUser)
    .then(createNewUser(User, data))
    .then(registerWithCustomerIO(cio))
    .then(loginUser(req))
    .then(returnNewUser(req, res))
    .fail(handleFailure(res))
    .done();
  }
}

function processEditUser (cio) {
  return function (req, res) {
    var data = {
      email: req.body.user.email,
      id: req.body.user.id
    };
    
    editUserInfo(User, data)
    .then(updateWithCustomerIO(cio))
    .then(returnUpdatedUser(req,res))
    .fail(handleFailure(res))
    .done();
  };
}

function login (req, res) {
  return res.json(formatDbResponse(req.user));
}

function logout (req, res) {
  req.logout();
  res.status(200).send("logged out successfully");
}

function isAuthenticated(req,res){
  return res.status(200).send();
}

function allowPasswordChange(req,res){
  var incomingPassword = req.user.password;
  console.log("incoming", incomingPassword);
  console.log("existing", User.password);
  
  bcrypt.compare(incomingPassword, User.password, function (err, isMatch) {
    if (err) {
      console.log("Error: ", err);
      return sendError(res, "error with server");
    }
    var wrongPass = "incorrect password for " + User.username;
    
    if (!isMatch) { 
      return sendError(res, "bad password");
    } else {
      return res.status(200).send();
    }
  });
    
  //console.log(bb);  
  //res.status(200).send();
}

exports.configure = function (app, passport, cio, options) {
  app.post('/users', processNewUser(cio));
  app.post('/user/create', processNewUser(cio));
  app.post('/user/login', passport.authenticate('local'), login);
  app.all('/user/logout', verifyAuth, logout);
  app.post('/user/authenticated', verifyAuth, isAuthenticated); 
  app.put('/user/edit', verifyAuth, processEditUser(cio));
  app.post('/user/pwchange', verifyAuth, allowPasswordChange); 
}
