var bcrypt = require('bcrypt')
  , mongoose = require('mongoose')
  , SALT_WORK_FACTOR = 10
  , moment = require('moment');

var UserSchema = new mongoose.Schema({
  password: {
    type: String,
    require: true
  },
  email: { 
    type: String,
    require: true,
    unique: true
  },
  created_at:{
    type: String
  },
  updated_at:{
    type: String
  },
  last_modified_action:{
    type: String
  }
});

UserSchema.pre('save', function (next) {
  var user = this;
  var timeCreated = moment().format('X');
  user.created_at = timeCreated;
  
  console.log("PRE SAVE FIRED");
  
  if (!user.isModified('password')) return next();
  
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
    if (err) return next(err); 
    
    //save the newly hashed pw as their password
    user.password = hash;
    next();
  });
});

UserSchema.methods.updated_at_timestamp = function updated_at_timestamp(action) {
 var timestamp = moment().format('X');
 this.updated_at = timestamp;
 this.last_modified_action = action;
 this.save();
 return timestamp;
}

var SubscriberSchema = new mongoose.Schema({

  created_date: {
    type: Date,
    require: true
  },

  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

});

exports.User = mongoose.model("User", UserSchema);
exports.Subscriber = mongoose.model("Subscriber", SubscriberSchema);
