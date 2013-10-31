var bcrypt = require('bcrypt')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../data_models/user').User
  , Q = require('q')
  , mustMatchPromised = require('../libs/bcrypt-promises').mustMatchPromised
  , callWithPromise = Q.ninvoke;

function handleNoUser(user) {
  if (!user) {
    throw new Error("No user found with that email");
  }
  return user;
}

//NOTE: we used passport done since
//strategy for use with Mongoose
function mongoStrategy (email, password, passportDone) {  
  User.findOnePromised({email: email})
  .then(handleNoUser)
  .then(function (user) {
    var passwordPromise = Q.defer()
      , invalidCredentials = new Error("Invalid credentials");

    mustMatchPromised(password, user.password)
    .then(function (match) {
      passwordPromise.resolve(user);
    })
    .fail(function (err) {
      //we MUST check if temp is blank, this would be big security hole!
      if (user.temporary_password === "" || user.temporary_password === null) {
        return passwordPromise.reject(invalidCredentials);
      }
      if (user.temporary_password === password) {
        //TODO: perhaps reset the temporary_password ??
        return passwordPromise.resolve(user);
      } else {
        return passwordPromise.reject(invalidCredentials);
      }
    });

    return passwordPromise.promise;
  })
  .then(function (user) {
    passportDone(null, user);
  })
  .fail(function(err){
    console.log(err);
    passportDone(null, false, err.message)})
  .done();
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
  passport.verifyAuth = function (req, res, next) {
    var noUser = "no user currently logged in";
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(400).send({message: noUser});
    }
  }
  return passport;
}
