var mongoose = require('mongoose')
  , timestamps = require('mongoose-timestamp')
  , promises = require('../../../libs/mongoose-promises')
  , encrypt = require('../../../libs/mongoose-encrypt');

var SubscriptionSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  subscription_id: {
    type: String,
    required: true
  }

});

SubscriptionSchema.plugin(timestamps);
SubscriptionSchema.plugin(promises);

var Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
