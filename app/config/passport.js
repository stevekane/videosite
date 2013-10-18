var bcrypt = require('bcrypt')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../models').User
  , Q = require('q')
  , callWithPromise = Q.ninvoke;

//helpers for async chain
function checkValidUser(email){
  return callWithPromise(User, "findOne", {email: email});
}

function handleNoUser(user) {
  var deferred = Q.defer();
  if (!user) { 
    deferred.reject(new Error('Invalid Username'));
  } else { 
    deferred.resolve(user);
  }
  return deferred.promise;
}

function checkPassword(password, passportDone){
  return function(user){ 
    return callWithPromise(bcrypt, "compare", password, user.password)
            .then( function(isMatch){
                if (!isMatch) return passportDone(null, false, {message: "Invalid Password"});
                else          return passportDone(null, user)})
  }
}

//strategy for use with Mongoose
function mongoStrategy (email, password, passportDone) {  
  checkValidUser(email)
  .then(handleNoUser)
  .then(checkPassword(password, passportDone))
  .fail(function(err){console.log("error: ", err)})
  .done();
} 

//return the id of the provided user
function serialize (user, done) {
  done(null, user._id);
}

//return the user based on id using mongo
function deserializeMongo (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
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
