var bcrypt = require('bcrypt')
  , mongoose = require('mongoose')
  , SALT_WORK_FACTOR = 10
  , timestamps = require('mongoose-timestamp');

var UserSchema = new mongoose.Schema({

  password: {
    type: String,
    require: true
  },
  temporary_password: {
    type: String,
  },
  email: { 
    type: String,
    require: true,
    unique: true
  },
  last_modified_action: {
    type: String
  },
  stripeId: {
    type: String,
  },
  subscribed: {
    type: Boolean,
    default: false,
  }

});

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

exports.User = mongoose.model("User", UserSchema);
