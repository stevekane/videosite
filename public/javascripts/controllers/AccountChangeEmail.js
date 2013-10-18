var set = Ember.set
  , alias = Ember.computed.alias;

App.AccountChangeEmailController = Ember.ObjectController.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

  newEmailHash: {
    email: "",
    confirmEmail: "",
  },

  resetFields: function (emailHash) {
    set(emailHash, 'email', "");
    set(emailHash, 'confirmEmail', "");
  },

  actions: {
    
    changeEmail: function (user, hash) {
      var emailError
        , previousEmail = user.get('email')
        , store = this.get('store')
        , self = this
        , values = {
        email: hash.email,
        confirmEmail: hash.confirmEmail,
      };
      
      if (hash.email === previousEmail) {
        self.resetFields(hash);
        set(self, "error", previousEmail + " is already your email address!");
        return;
      }

      if (hash.email !== hash.confirmEmail) {
        set(self, "error", "Provided emails did not match");             
        set(hash, "email", "");
        set(hash, "confirmEmail", "");
        return;
      } else {
        user.set('email', hash.email)
          .save()
          .then(function (user) { 
            self.resetFields(hash);
          })
          .fail(function (error) {
            user.set('email', previousEmail);
            console.log(error);
            set(self, "error", JSON.parse(error.responseText)['error']);             
          });
      }
    }
  }

});
