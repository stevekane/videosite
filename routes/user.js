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
  console.log('sendError');
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
  console.log('registerWithCIO');
  return function (user) {
    cio.identify(user._id, user.email);
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
  console.log("edit User");
  
  //strip out the ID from info to update
  var updatedInfo = {};
  updatedInfo.email = data.email;
  
  return callWithPromise(User, "findOneAndUpdate", {_id: data.id}, {$set: updatedInfo})      
}


//closure gives access to our customer.io object
function processNewUser (cio) {

  return function (req, res) {
    var data = {
     password: req.body.user.password,
     email: req.body.user.email
    }; 

    checkForExistingUser(User, {email: data.email})
    .fail(handleFailure(res, "Server error while handling new user."))
    .then(function (user) {
      if (user) { return handleExistingUser(req, res); }

      createNewUser(User, data)
      .fail(handleFailure(res, "Server error while creating new user."))
      .then(registerWithCustomerIO(cio))
      .then(returnNewUser(req, res))
      .done();
    })
    .done();
  }
}

function processEditUser(cio){
  return function (req, res) {
    var data = {
      email: req.body.user.email,
      id: req.body.user.id
    };
    
    editUserInfo(User, data)
    .fail(handleFailure(res, "Server Error while updating user info"))
    .then(updateWithCustomerIO(cio))
    .then(returnUpdatedUser(req,res))
    .done();
  };
}

function login (req, res) {
  return res.json({user: formatDbResponse(req.user)});
}

function logout (req, res) {
  req.logout();
  res.status(200).send("logged out successfully");
}

function isAuthenticated(req,res){
  return res.status(200).send();
}

function allowPasswordChange(req,res){
  res.status(200).send("password ok");
  // var incomingPassword = req.user.password;
  // console.log(req.user);
  
  
  // var bb = bcrypt.compare(incomingPassword, User.password, function (err, isMatch) {
      // if (err) {
        // console.log("Error: ", err);
        // return sendError(res, "error with server");
      // }
      // var wrongPass = "incorrect password for " + User.username;
      
      // if (!isMatch) { 
        // return sendError(res, "bad password");
      // } else {
        // return res.status(200).send();
      // }
    // });
    
  //console.log(bb);  
  
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
