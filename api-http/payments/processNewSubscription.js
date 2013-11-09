var Q = require('q');
var persistence = require('../../systems/persistence')
  , payments = require('../../systems/payments')
  , sendError = require('../../utils/http').sendError
  , sendEmail = require('../../systems/email').sendEmail
  , template = require('../../templates/emails').subscribe
  , refreshSession = require('../../utils/session').refreshSession
  , throwIfMissing = require('../../utils/promises').throwIfMissing;

/*
SETUP/EXTRACTION
Extract user from request object
Extract plan from request body
Extract token from request body

//CRITICAL SEQUENCE
Find the user by id   err: ->  reject outer "Your account could not be found!"

If the user has no customer_id
  create a customer with the payments system using the provided token and plan
  save the returned customer_id on the User model

If the user has a customer_id
  retrieve the customer from the payments system using customer_id
  if the customer does not exist, create one using the provided data
  update the User model with the newly available customer_id

Update the customer with the provided plan and card/token
Create a Subscription in the database w/ returned info
Update User in the database to reference newly created Subscription

Return the updated User and newly created Subscription
On error, return an error using sendError

Send an email to the user's email
*/

module.exports = function (req, res) {

  var user = req.user
    token = req.body.token
    plan = req.body.plan || "silver";

  var subscriptionData = {
    plan: plan,
    card: token
  };
  
  //if we don't have everything we need, just return early
  try {
    throwIfMissing(user);
    throwIfMissing(token);
    throwIfMissing(plan);
  } catch (err) {
    return sendError(res, err);
  }

  persistence.findById("user", user.id)
  .then(throwIfMissing("Your account was not found!"))
  .then(function (foundUser) {
    var customerPromise = (foundUser.customer_id)
      ? payments.getCustomerById(foundUser.customer_id)
      : payments.createCustomer({email: foundUser.email});

    return customerPromise
    .then(function (customerData) {
      return payments.updateSubscription(customerData.id, subscriptionData)
      .then(null, payments.getErrorMessage)
      .then(function (subscriptionData) {
        var subData = {
          user_id: foundUser.id,
          subscription_id: subscriptionData.id
        };

        return persistence.create("subscription", subData)
        .then(function (subscription) {
          var userUpdates = {
            customer_id: customerData.id,
            subscription_id: subscription.id
          };

          return persistence.updateById("user", foundUser.id, userUpdates)
          .then(function (updatedUser) {
            return [updatedUser, subscription];
          })
        })
      })
    }) 
  })
  .spread(function (user, subscription) {
    var emailData = {
      to: user.email,
      from: "kanesteven@gmail.com",
      subject: "Thanks for subscribing!",
      html: template ? template() : "Subscribed!"
    };

    //we don't care if this fails...for now
    sendEmail(emailData);

    //TODO: This MUST be reworked to filter out password/temp
    res.send({
      user: user,
      subscription: subscription
    })
  })
  .fail(function (err) {
    sendError(res, err);
  });

}
