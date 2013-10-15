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
        if (err) { return console.log(err); } 
        
        console.log(user.username, "created");
        return res.json(formatDbResponse(user));
      });
    }
  });
}

function login (req, res) {
  return res.json({user: req.user});
}

function logout (req, res) {
  req.logout();
  return res.json({});
}

exports.configure = function (app, passport, options) {
  app.post('/user/create', createUser);
  app.post('/user/login', passport.authenticate('local'), login);
  app.get('/user/logout', logout);
}
