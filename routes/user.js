var User = require('../app/models').User
  , verifyAuth = require('../app/config/passport').verifyAuth
  , CustomerIO = require('customer.io');

// CustomerIO.init(site ID, API token)
var cio = CustomerIO.init('61e69d38865a3b27286b', 'faada99ebd4a66168a02')

function formatDbResponse (model) {
  if(model){
    var formattedModel = model.toObject();

    formattedModel.id = formattedModel._id;
    delete formattedModel.password;
    delete formattedModel._id;
    delete formattedModel.__v;
    return formattedModel;
  }
}

function createUser (req, res) {
  var searchTerms = {username: req.body.username};

  User.findOne(searchTerms, function (err, user) {
    var data = {};

    if (err) { 
      errorType = err.match(/\$([^}]+)\_/)[1];
      console.log(errorType);
    }

    if (user) {
      return res.status(400).send({username: "Error: Username is already in use!"});
    } else
    {
      data.username = req.body.username;
      data.password = req.body.password;
      data.email = req.body.email;
      
      User.create(data, function (err, user) {
        if (err) {
          //TODO if add more fields to model, need to check different error types
          errorType = err.err.match(/\$([^}]+)\_/)[1];
          if (errorType === "email"){
            errorObj = {email: "Error: Email is already in Use!"};
          }else{
            errorObj = {global: "Error: Server error while saving!"};
            errorObj["errorData"] = err.err;
          }
          return res.status(400).send(errorObj);
        } 
        
        //call Customer.io identify method to either create or update a user by email adress
        cio.identify(user.id, user.email);
        return res.json(formatDbResponse(user));
      });
    }
  });
}

function editUser(req, res){
  updatedInfo = req.body;
  delete updatedInfo._id;
  delete updatedInfo.__v;
  //TODO: add email change, needs to switch old customer.io email to new, updating
  
  //TODO: fix password hashing on modify, then remove this
  delete updatedInfo.password;
  
  User.findOneAndUpdate({_id: req.body.id}, {$set: updatedInfo},
    function (err, result) {
      var response = {};
      if (err) {
        console.log(err);
        res.json({message: err});
      } else {
        response['user'] = formatDbResponse(result);
        res.send(response);
      }
    });

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
