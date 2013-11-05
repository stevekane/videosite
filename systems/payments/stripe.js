var stripeConfig = require('../../config/config.json').stripe
  , stripe = require('stripe')(stripeConfig.test_api_key); 

var createCustomer = function (data) {
  return stripe.customers.create(data);
}

module.exports.createCustomer = createCustomer;
