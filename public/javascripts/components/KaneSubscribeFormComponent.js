var set = Ember.set;

var validateCardNumber = {
  fn: function (hash) {
    return Stripe.card.validateCardNumber(hash.number.value); 
  },
  error: "Invalid card number",
  fields: ["number"]
};

var validateCvc = {
  fn: function (hash) {
    return Stripe.card.validateCVC(hash.cvc.value); 
  },
  error: "Invalid cvc",
  fields: ["cvc"]
};

var validateExpiry = {
  fn: function (hash) {
    var month = hash.exp_month.value
      , year = hash.exp_year.value;
    return Stripe.card.validateExpiry(month, year);
  },
  error: "Invalid expiration",
  fields: ["exp_month", "exp_year"]
}

/*
We return a promise as specicified by the requirements for this hook
We first create a token on Stripe's server
We then send that token along to our own server for processing 
With the stripe API
*/
var attemptSubscribe = function (hash) {
  var self = this
    , url = "/subscription/new";
  
  var cardData = {
    number: hash.number.value, 
    cvc: hash.cvc.value, 
    exp_month: hash.exp_month.value, 
    exp_year: hash.exp_year.value
  };

  return Ember.RSVP.Promise(function (resolve, reject) {

    //create a token w/ Stripe's server
    Stripe.card.createToken(cardData, function (status, response) {
      if (response.error) {
        set(self, "error", response.error.message);
        return reject(response.error);
      } else {
        //returned reponse object contains an "id".
        //set this as hash.token and send to node server
        var serverHash = {token: response.id};

        Ember.$.post(url, serverHash)
        .then(resolve)
        .fail(reject);
      }
    });
  });
}

App.KaneSubscribeFormComponent = App.KaneFormComponent.extend({

  fields: {
    number: new Forms.Field("", ""),
    exp_month: new Forms.Field("", ""),
    exp_year: new Forms.Field("", ""),
    cvc: new Forms.Field("", "")
  },

  cardType: function () {
    var number = this.get('fields.number.value')
      , provider = Stripe.card.cardType(number);
    
    return ("Unknown" === provider) ? null : provider;
  }.property('fields.number.value'),

  localFieldValidations: [
    validateCardNumber,
    validateCvc,
  ],

  localFormValidations: [
    validateExpiry 
  ],

  submitFn: attemptSubscribe

});
