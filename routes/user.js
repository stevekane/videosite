var User = require('../app/models').User
  , verifyAuth = require('../app/config/passport').verifyAuth;

function formatDbResponse (model) {
  var formattedModel = model.toObject();

  formattedModel.id = formattedModel._id;
  delete formattedModel.password;
  delete formattedModel._id;
  delete formattedModel.__v;
  return formattedModel;
}

function createUser (req, res) {
  var searchTerms = {username: req.body.username};

  User.findOne(searchTerms, function (err, user) {
    var data = {};

    if (err) { return console.log(err); }

    if (user) {
      return res.status(400).send('User name already exists.');
    } else {
      data.username = req.body.username;
      data.password = req.body.password;
      data.email = req.body.email;
      User.create(data, function (err, user) {
        if (err) { return res.status(400).send(err);
        } 
        
        console.log(user.username, "created");
        return res.json(formatDbResponse(user));
      });
    }
  });
}

function editUser(req, res){
  updatedInfo = req.body;
  delete updatedInfo._id;
  delete updatedInfo.__v;
  
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
  req.redirect('/');
}

exports.configure = function (app, passport, options) {
  app.post('/user/create', createUser);
  app.post('/user/login', passport.authenticate('local'), login);
  app.all('/user/logout', logout);
  app.post('/user/edit', verifyAuth, editUser);
}
