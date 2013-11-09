var Q = require('q')
  , stripeConfig = require('../../config/config.json').stripe
  , stripe = require('stripe')(stripeConfig.test_api_key); 

module.exports.createCustomer = function (data) {
  return stripe.customers.create(data)
}

module.exports.getCustomerById = function (id) {
  return stripe.customers.retrieve(id)
}

module.exports.updateSubscription = function (customer_id, data) {
  return stripe.customers.updateSubscription(customer_id, data);
}

module.exports.getErrorMessage = function (err) {
  var defer = Q.defer;

  defer.reject(err.message); 

  return defer.promise;
}
