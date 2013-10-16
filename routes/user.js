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

function logAndSendError (req, res, next) {
  return function (err) {
    console.log(err);
    res.error = err;
    return next();
  }
}

function createUser (req, res, next) {
  var data = {
   username: req.body.user.username,
   password: req.body.user.password,
   email: req.body.user.email
  }; 

  callWithPromise(User, "findOne", {username: data.username})
  .then(function (user) {
    if (user) { 
      res.error = {username: "Username already taken."};
      return next();
    }

    callWithPromise(User, "create", data)
    .then(function (user) {
      res.user = formatDbResponse(user);
      return next();
    })
    .fail(logAndSendError(req, res, next))
    .done();
  })
  .fail(logAndSendError(req, res, next))
  .done();
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
  .fail(logAndSendError(req, res))
  .done();
};


function login (req, res) {
  return res.json({user: formatDbResponse(req.user)});
}

function logout (req, res) {
  req.logout();
  res.status(200).send("logged out successfully");
}

function returnUserOrError (req, res) {
  if (res.error) {
    return res.status(400).send(res.error);
  } else if (res.user) {
    return res.json(res.user);
  } else {
    return res.status(400).send({global: "There was an error."});
  }
}

exports.configure = function (app, passport, cio, options) {
  app.post('/users', createUser, returnUserOrError);
  app.post('/user/create', createUser, returnUserOrError);
  app.post('/user/login', passport.authenticate('local'), login);
  app.all('/user/logout', verifyAuth, logout);
  app.post('/user/edit', verifyAuth, editUser);
}
