var mongoose = require('mongoose')
  , timestamps = require('mongoose-timestamp')
  , promises = require('../../../libs/mongoose-promises')
  , encrypt = require('../../../libs/mongoose-encrypt');

var UserSchema = new mongoose.Schema({
  
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    default: "",
  },
  temporary_password: {
    type: String,
    default: ""
  },
  customer_id: {
    type: String,
    default: ""
  },
  subscription_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Subscription"
  },

});

var encryptionOptions = {
  keys: ["password", "temporary_password"]
};
UserSchema.plugin(timestamps);
UserSchema.plugin(promises);
UserSchema.plugin(encrypt, encryptionOptions);

var User = mongoose.model("User", UserSchema);

module.exports = User;
