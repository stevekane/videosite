var _ = require('lodash')
  , User = require('../data_models/user').User
  , sendConfirmation = require('../utils/http').sendConfirmation
  , sendError = require('../utils/http').sendError
  , createCustomer = require('../systems/payments').createCustomer

//user is an existing user in mongo, customer is returned from stripe
var saveCustomerInDb = _.curry(function (user, customer) {
  var id = user._id
    , changes = {
      $set: {
        stripeId: customer.id,
        subscribed: true
      }
    };

  return User.findByIdAndUpdatePromised(id, changes);
});

/*
Extract the token from the body and user from session
Send the information to Stripe to create a customer with a plan
Create subscription status in mongo
Send an email to the customer thanking them for being fucking awesome
return the updated user object
*/
var processNewSubscription = function (req, res) {
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

  createCustomer(data)
  .then(saveCustomerInDb(user))
  .then(sendConfirmation(res))
  .then(null, sendError(res));
};

exports.configure = function (app) {
  var passport = app.get('passport')

  app.post("/subscriber/create", passport.verifyAuth, processNewSubscription);
  return app;
}
