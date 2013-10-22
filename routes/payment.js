var moment = require('moment')
  , Q = require('q')
  , _ = require('lodash')
  , User = require('../app/models').User
  , verifyAuth = require('../app/config/passport').verifyAuth
  , sendConfirmation = require('../app/utils/http').sendConfirmation
  , sendError = require('../app/utils/http').sendError
  , callWithPromise = Q.ninvoke;

var verifySuccess = _.curry(function (message, result) {
  console.log('verifySuccess');
  if (!result.success) {
    throw new Error(message);
  }
  return result;
});

//retrive customer (or throw) from response from braintree
function extractCustomer (result) {
  console.log('extractCustomer');
  if (!result.customer) {
    throw new Error("No customer returned from braintree.");
  }
  return result.customer;
}

//Braintree's api will return a customer.  Use this user to make another
//API call to activate their subscription
var activateSubscription = _.curry(function (gateway, planId, customer) {
  console.log("activateSubscription");
  var subscriptionRequest = {
    paymentMethodToken: customer.creditCards[0].token,
    planId: planId 
  };
  return callWithPromise(gateway.subscription, "create", subscriptionRequest);
});

var createCustomer = _.curry(function (gateway, details, user) {
  details.id = user._id;
  callWithPromise(gateway.customer, "create", details);
});

//create a new customer by registering information with Braintree
var processNewActiveSubscription = _.curry(function (gateway, req, res) {
  var customerDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    creditCard: {
      number: req.body.number,
      cvv: req.body.cvv,
      expirationMonth: req.body.expirationMonth,
      expirationYear: req.body.expirationYear,
    }
  };

  //TODO: planId could be pulled from request if it will vary
  var planId = "test_recurring_plan";
  var userId = req.user._id;

  callWithPromise(User, "findByIdAndUpdate", userId, {$set: {subscribed: true}})
  .then(createCustomer(gateway, customerDetails))
  .then(extractCustomer)
  .then(activateSubscription(gateway, planId))
  .then(verifySuccess("Subscription activation unsuccessful."))
  .then(sendConfirmation(res))
  .fail(sendError(res))
  .done();
});


exports.configure = function (app, cio, gateway) {
  app.post("/subscriber/create", verifyAuth, processNewActiveSubscription(gateway));
  return app;
}
