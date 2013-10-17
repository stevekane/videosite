var bcrypt = require('bcrypt')
  , mongoose = require('mongoose')
  , SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  password: {
    type: String,
    require: true
  },
  email: { 
    type: String,
    require: true,
    unique: true
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

exports.User = mongoose.model("User", UserSchema);
