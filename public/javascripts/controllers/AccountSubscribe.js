var set = Ember.set
  , alias = Ember.computed.alias;

App.AccountSubscribeController = Ember.Controller.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

  newSubscriptionHash: {
    firstName: "",
    lastName: "",
    number: "",
    expirationMonth: "",
    expirationYear: "",
    ccv: ""
  },

  resetFields: function (hash) {
    set(hash, "firstName", "");
    set(hash, "lastName", "");
    set(hash, "number", "");
    set(hash, "expirationMonth", "");
    set(hash, "expirationYear", "");
    set(hash, "ccv", "");
  },

  actions: {
    
    subscribe: function (user, hash) {
      var emailError
        , email = user.get('email')
        , store = this.get('store')
        , encrypt = App.braintree.encrypt
        , self = this
        , activeUser = this.get('content');

      //TODO: Kinda janky?
      var encryptedHash = {
        firstName: encrypt(hash.firstName),
        lastName: encrypt(hash.lastName),
        number: encrypt(hash.number),
        expirationMonth: encrypt(hash.expirationMonth),
        expirationYear: encrypt(hash.expirationYear),
      }
      
      //client-side sanity checks..
      if (hash.ccv.length !== 3) {
        set(self, "error", "CCV must be three numbers");
        set(hash, "ccv", "");
        return;
      }

      //TODO: check if month and year form valid date...moment().isValid was
      //treating months > 12 as still being valid....
      $.ajax({
        type: 'POST',
        url: "/subscriber/create",
        data: encryptedHash,
        success: function (response) {
          set(activeUser, "subscribed", true);
          self.resetFields(hash);
          self.transitionToRoute('index');
        },
        error: function (response) {
          console.log(response);
          set(self, "error", "Subscription process failed.  very sad"); 
        }
      })
    },
  }
});
