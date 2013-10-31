var bcrypt = require('bcrypt')
  , mongoose = require('mongoose')
  , timestamps = require('mongoose-timestamp')
  , promisify = require('../libs/mongoose-promises')
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

//TODO: user promises!
UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();
  
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
    if (err) return next(err); 
    
    //save the newly hashed pw as their password
    user.password = hash;
    next();
  });
});

UserSchema.plugin(timestamps);
UserSchema.plugin(promisify);

var User = mongoose.model("User", UserSchema);
exports.User = User;
