var moment = require('moment')
  , Q = require('q')
  , User = require('../app/models').User
  , Subscriber = require('../app/models').Subscriber
  , verifyAuth = require('../app/config/passport').verifyAuth
  , sendError = require('../app/utils/http').sendError
  , callWithPromise = Q.ninvoke;


//fired after braintree creates a customer
function checkForSuccess (result) {
  console.log('checkForSuccess');
  if (!result.success) {
    throw new Error("Interaction with braintree unsuccessful.");
  }
  return result;
}

/**
after we have successfully registered this subscriber with braintree,
we will call this function to create a new subscriber model in the DB
that is associated with the provided user model
*/
function createSubscriber (user) {
  return function () {
    console.log('createSubscriber');
    var subscriberData = {
      created_date: moment().format("X"),
      _user: user._id
    };
    return callWithPromise(Subscriber, "create", subscriberData);
  }
}

//Braintree's api will return a user.  Use this user to make another
//API call to activate their subscription
function activateSubscription (gateway, planId) {
  return function (customer) {
    console.log("activateSubscription");
    var subscriptionRequest = {
      paymentMethodToken: customer.creditCards[0].token,
      planId: planId 
    };

    return callWithPromise(gateway.subscription, "create", subscriptionRequest);
  }
}

function sendBillingConfirmation (res) {
  console.log('sendBillingConfirmation');
  return function (subscriber) {
    return res.status(204).send(); 
  }
}

//create a new customer by registering information with Braintree
function processNewSubscriber (gateway) {
  return function (req, res) {

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

    //planId could be pulled from request if it will vary
    var planId = "test_recurring_plan";
    var user = req.user;

    callWithPromise(gateway.customer, "create", customerDetails)
    .then(checkForSuccess)
    .then(activateSubscription(gateway, planId))
    .then(checkForSuccess)
    .then(createSubscriber(user))
    .then(sendBillingConfirmation(res))
    .fail(sendError(res))
    .done()
  }
}


exports.configure = function (app, cio, gateway) {

  app.post("/subscriber/create", verifyAuth, processNewSubscriber(gateway));

  return app;
}
