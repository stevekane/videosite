var set = Ember.set;

/*
We return a promise as specicified by the requirements for this hook
We first create a token on Stripe's server
We then send that token along to our own server for processing 
With the stripe API
*/
var attemptSubscribe = function (url, hash) {
  var self = this;

  return Ember.RSVP.Promise(function (resolve, reject) {

    //create a token w/ Stripe's server
    Stripe.card.createToken(hash, function (status, response) {
      if (response.error) {
        set(self, "error", response.error.message);
        return reject(response.error);
      } else {

        //returned reponse object contains an "id".
        //set this as hash.token and send to node server
        var serverHash = {token: response.id};

        Ember.$.post(url, serverHash)
        .then(function (result) {
          return resolve(result);  
        })
        .fail(function (err) {
          return reject(err); 
        });
      }
    });
  });
}

App.KaneSubscribeFormComponent = App.KaneBaseFormComponent.extend({

  hash: {
    name: "",
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
  },

  url: "/subscriber/create",

  submit: attemptSubscribe

});
