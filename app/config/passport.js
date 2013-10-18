var bcrypt = require('bcrypt')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../models').User;

//strategy for use with Mongoose
function mongoStrategy (email, password, done) {
  User.findOne({email: email}, function (err, user) {
    if (err) return done(err);

    var noUserFound = "no user found named " + email;
    if (!user) { 
      return done(null, false, { message: noUserFound }); 
    }
    
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) return done(err);

      var wrongPass = "incorrect password for " + email;
      if (!isMatch) { 
        return done(null, false, { message: wrongPass });
      } else {
        return done(null, user);
      }
    });
  }); 
}

//return the id of the provided user
function serialize (user, done) {
  done(null, user);
}

//return the user based on id using mongo
function deserializeMongo (user, done) {
  done(null, user); 
}

exports.configure = function (passport, options) {
  passport.use(new LocalStrategy({usernameField: 'email'}, mongoStrategy));
  passport.serializeUser(serialize);
  passport.deserializeUser(deserializeMongo);
}

exports.verifyAuth = function (req, res, next) {
  var noUser = "no user currently logged in";
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(400).send({message: noUser});
  }
}
