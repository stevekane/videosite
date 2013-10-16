var set = Ember.set
  , alias = Ember.computed.alias;

App.AccountChangeEmailController = Ember.ObjectController.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

  newEmailHash: {
    email: {value: "", error: ""},
    confirmEmail: {value: "", error: ""},
  },

  resetFields: function (emailHash) {
    set(emailHash, 'email.value', "");
    set(emailHash, 'email.error', "");
    set(emailHash, 'confirmEmail.value', "");
    set(emailHash, 'confirmEmail.error', "");
  },

  actions: {
    
    changeEmail: function (user, hash) {
      var emailError
        , store = this.get('store')
        , self = this
        , values = {
        email: hash.email.value,
        confirmEmail: hash.confirmEmail.value,
      };
      
      if (hash.email.value !== hash.confirmEmail.value) {
        emailError = "Provided emails did not match."
        set(hash, "email.value", "");
        set(hash, "email.error", emailError);
        set(hash, "confirmEmail.value", "");
        set(hash, "confirmEmail.error", emailError);
        return;
      } else {
        user.set('email', hash.email.value)
          .save()
          .then(function (user) { 
            self.resetFields(hash);
          })
          .fail(function (errors) {
            set(hash, "email.error", errors.email);             
            set(hash, "confirmEmail.error", errors.email);             
          });
      }
    }
  }

});
