var set = Ember.set;

/*
We return a promise as specicified by the requirements for this hook
We first create a token on Stripe's server
We then send that token along to our own server for processing 
With the stripe API
*/
var attemptSubscribe = function (hash) {
  var self = this;

  set(self, "disabled", true);
  return Ember.RSVP.Promise(function (resolve, reject) {

    //create a token w/ Stripe's server
    Stripe.card.createToken(hash, function (status, response) {
      if (response.error) {
        set(self, "error", response.error.message);
        reject(response.error);
      } else {
        //returned reponse object contains an "id".
        //set this as hash.token and send to node server
        var serverHash = {token: response.id};

        Ember.$.ajax("/subscriber/create", {type: "POST", data: serverHash})
        .then(function (result) {
          resolve(result);  
        })
        .fail(function (err) {
          reject(err); 
        });
      }
    });
  });
}

var completeSubscribe = function (response) {
  var hash = this.get('hash');

  console.log("subscription successful!", response);
  set(this, "disabled", false);
  this.resetFields(hash);
}

var declineSubscribe = function (response) {
  var hash = this.get('hash');

  set(this, "disabled", false);
  this.resetFields(hash);
  set(this, "error", "Subscription Failed.");
}

App.KaneSubscribeFormComponent = App.KaneFormComponent.extend({
  
  hash: {
    name: "",
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
  },

  verifications: [],

  submitAction: attemptSubscribe,

  handleSuccess: completeSubscribe,

  handleFailure: declineSubscribe,

});
