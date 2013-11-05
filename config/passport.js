var Q = require('q')
  , LocalStrategy = require('passport-local').Strategy
  , persistence = require('../systems/persistence')
  , compareMultiple = require('../libs/bcrypt-promises').compareMultiplePromised
  , throwIfMissing = require('../utils/promises').throwIfMissing;

function localStrategy (email, password, passportDone) {  

  persistence.findOne("user", {email: email})
  .then(throwIfMissing("No user found for provided email"))
  .then(function (user) {
    return compareMultiple(user.password, user.temporary_password, password)
    .then(function () {
      return passportDone(null, user); 
    });
  })
  .fail(function (err) {
    console.log(err.stack);
    return passportDone(null, false, err.message);
  })
  .done();
} 

//return the id of the provided user
function serialize (user, done) {
  done(null, user);
}

//return the user based on id using mongo
function deserialize (user, done) {
  done(null, user); 
}

exports.configure = function (passport, options) {
  passport.use(new LocalStrategy({usernameField: 'email'}, localStrategy));
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.verifyAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(400).send({
        message: "No user session found."
      });
    }
  }
  return passport;
}
