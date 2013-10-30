var mongoose = require('mongoose')
  , timestamps = require('mongoose-timestamp');

var SubscriptionSchema = new mongoose.Schema({
  
});

SubscriptionSchema.plugin(timestamps);

exports.Subscription = mongoose.model("Subscription", SubscriptionSchema);
