var User = require('../app/models').User
  , Subscriber = require('../app/models').Subscriber
  , verifyAuth = require('../app/config/passport').verifyAuth
  , Q = require('q')
  , callWithPromise = Q.ninvoke;


/**
after an attempt to setup a customer w/ Braintree, this is called w/ the result
we return either a resolved promise or a rejected promise depending on whether
the result of the attempted subscription creation was successful
*/
function handleCustomerCreation (result) {
  var subscriberPromise = Q.defer();

  if (result.success) {
    subscriberPromise.resolve(result); 
  } else {
    subscriberPromise.reject(new Error(result.message)); 
  }
  return subscriberPromise.promise;
}

/**
after we have successfully registered this subscriber with braintree,
we will call this function to create a new subscriber model in the DB
that is associated with the provided user model
*/
function createSubscriber (user) {
  return function (result) {
    var subscriberData = {
      created_date: moment().format("X"),
      _user: user._id
    };
    return callWithPromise(Subscriber, "create", subscriberData);
  }
}

function sendBillingConfirmation (res) {
  console.log('sendBillingConfirmation');
  return function (subscriber) {
    return res.status(204).send(); 
  }
}

//used to send errors from promise .fail hooks
function handleFailure (res) {
  return function (err) {
    console.log("handleFailure", err);
    var message = (err instanceof Error)
      ? err.message
      : err;

    return res.status(400).send({error: message});
  }
}

//create a new customer by registering information with Braintree
function processNewSubscriber (gateway) {
  return function (req, res, next) {

    var customerDetails = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      creditCard: {
        number: req.body.number,
        cvv: req.body.cvv,
        expirationMonth: req.body.month,
        expirationYear: req.body.year,
        billingAddress: {
          postalCode: req.body.postalCode 
        }
      }
    };
    var user = req.body.user;

    callWithPromse(gateway, "customer.create", customerRequest)
    .then(handleCustomerCreation)
    .then(createSubscriber(user))
    .then(sendBillingConfirmation(res))
    .fail(handleFailure(res))
    .done()
  }
}


exports.configure = function (app, cio, gateway) {

  app.post("/subscriber/create", verifyAuth, processNewSubscriber(gateway));

  return app;
}
