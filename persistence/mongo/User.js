var mongoose = require('mongoose')
  , mongoose-timestamp = require('mongoose-timestamp')
  , mongoose-promises = require('../../libs/mongoose-promises')
  , mongoose-encrypt = require('../../libs/mongoose-encrypt');

var UserSchema = new mongoose.schema({
  
  email: String,
  password: String,
  temporary_password: String,

}):

var encryptionOptions = {
  keys: ["password", "temporary_password"]
};
UserSchema.plugin(mongoose-timestamp);
UserSchema.plugin(mongoose-promises);
UserSchema.plugin(mongoose-encrypt, encryptionOptions);

var User = mongoose.model("User", UserSchema);

module.exports = User;
