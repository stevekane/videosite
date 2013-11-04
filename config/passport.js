var Q = require('q')
  , LocalStrategy = require('passport-local').Strategy
  , compare = require('../libs/bcrypt-promises').comparePromised
  , persistence = require('../systems/persistence');

function handleNoUser(user) {
  if (!user) {
    throw new Error("No user found with that email");
  }
  return user;
}

function mongoStrategy (email, password, passportDone) {  

  persistence.findOne("user", {email: email})
  .then(handleNoUser)
  .then(function (user) {
    var comparisons = [
      compare(password, user.password),
      compare(password, user.temporary_password)
    ];

    //compare against pw and temp pw
    return Q.allSettled(comparisons)
    .spread(function (pwMatch, tmpMatch) {
      if (pwMatch || tmpMatch) {
        passportDone(null, user); 
      } else {
        passportDone(null, false); 
      }
    })
  })
  .fail(function (err) {
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
