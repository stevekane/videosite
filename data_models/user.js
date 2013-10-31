var bcrypt = require('bcrypt')
  , Q = require('q')
  , mongoose = require('mongoose')
  , timestamps = require('mongoose-timestamp')
  , promisify = require('../libs/mongoose-promises')
  , hashPromised = require('../libs/bcrypt-promises').hashPromised
  , mustMatchPromised = require('../libs/bcrypt-promises').mustMatchPromised
  , SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({

  password: {
    type: String,
    require: true
  },
  temporary_password: {
    type: String,
    default: ""
  },
  email: { 
    type: String,
    require: true,
    unique: true
  },
  stripeId: {
    type: String,
    default: null
  },
  subscribed: {
    type: Boolean,
    default: false,
  }

});

/*
//If our password has changed, we should encrypt it before
//saving AND reset the temporary_password field to ""
*/
UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }
  user.temporary_password = "";
  
  hashPromised(user.password, SALT_WORK_FACTOR)
  .then(function (hash) {
    user.password = hash;
    return next();
  })
  .fail(function (err) {
    console.log(err);
    return next(err);  
  })
  .done()
});

//Match by comparing first stored password then stored temporary password
UserSchema.methods.matchPasswordOrTemporaryPromised = function (password) {
  var pwMatch = Q.defer()
    , user = this
    , invalidCredentials = new Error("Invalid credentials");

  mustMatchPromised(password, user.password)
  .then(function (success) {
    pwMatch.resolve(user);
  })
  .fail(function (err) {
    //we MUST check if temp is blank, this would be big security hole!
    if (!user.temporary_password) {
      return pwMatch.reject(invalidCredentials);
    }
    if (user.temporary_password === password) {
      return pwMatch.resolve(user);
    } else {
      return pwMatch.reject(invalidCredentials);
    }
  });

  return pwMatch.promise;
}

UserSchema.plugin(timestamps);
UserSchema.plugin(promisify);

var User = mongoose.model("User", UserSchema);
exports.User = User;
