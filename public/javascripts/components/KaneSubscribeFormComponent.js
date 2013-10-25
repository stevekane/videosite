var set = Ember.set;

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
        hash.token = response.id;

        Ember.$.ajax("/subscriber/create", {type: "POST", data: hash})
        .then(function (result) {
          resolve(result);  
        })
        .fail(function (err) {
          reject(err); 
        });
      }
    });
  })
}

var completeSubscribe = function (response) {
  console.log("subscription successful!", response);
  set(this, "disabled", false);
  this.resetFields(hash);
}

var declineSubscribe = function (response) {
  console.log("subscription failed  :( !", response);
  this.resetFields(hash);
  set(this, "disabled", false);
  set(this, "error", "Subscription Failed.");
}

App.KaneSubscribeFormComponent = App.KaneFormComponent.extend({
  
  hash: {
    name: "",
    number: "",
    expirationMonth: "",
    expirationYear: "",
    ccv: "",
  },

  verifications: [],

  submitAction: attemptSubscribe,

  handleSuccess: completeSubscribe,

  handleFailure: declineSubscribe,

});
