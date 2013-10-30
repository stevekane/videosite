var moment = require('moment')
  , Q = require('q')
  , _ = require('lodash')
  , User = require('../data_models/user').User
  , verifyAuth = require('../config/passport').verifyAuth
  , sendConfirmation = require('../utils/http').sendConfirmation
  , sendError = require('../utils/http').sendError
  , email = require('../libs/email')
  , callWithPromise = Q.ninvoke;

//user is an existing user in mongo, customer is returned from stripe
var saveCustomerInDb = _.curry(function (user, customer) {
  console.log('saving customer to db');
  var id = user._id
    , mongoChangeObject = {
      $set: {
        stripeId: customer.id,
        subscribed: true
      }
    };

  return callWithPromise(User, "findByIdAndUpdate", id, mongoChangeObject);
});

/*
Extract the token from the body and user from session
Send the information to Stripe to create a customer with a plan
Create subscription status in mongo
Send an email to the customer thanking them for being fucking awesome
return the updated user object
*/
var processNewSubscription = _.curry(function (stripe, sendgrid, req, res) {
  var user = req.user
    , token = req.body.token;

  //early return if missing key data
  if (!user) { return sendError(res, "No valid user session.");}
  if (!user) { return sendError(res, "No valid token.");}

  //vars for use with stripe
  var plan = req.body.plan || "silver"
    , data = {
       email: user.email,
       plan: plan,
       card: token
    };

  //vars for sending email
  var templateName = "./templates/email/subscribe.handlebars"
    , config = {
        from: "kanesteven@gmail.com",
        to: user.email,
        subject: "Thanks for subscribing!"
    };

  console.log('inside process');
  stripe.customers.create(data)
  .then(saveCustomerInDb(user))
  //.then(email.compileAndSendEmail(sendgrid, config, templateName, user))
  .then(sendConfirmation(res))
  .then(null, sendError(res));
});

exports.configure = function (app) {
  var stripe = app.get('stripe')
    , sendgrid = app.get('sendgrid');

  app.post("/subscriber/create", verifyAuth, processNewSubscription(stripe, sendgrid));
  return app;
}
