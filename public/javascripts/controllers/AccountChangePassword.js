var set = Ember.set
  , alias = Ember.computed.alias;

App.AccountChangePasswordController = Ember.ObjectController.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

  newPasswordHash: {
    oldPassword: {value: "", error: ""},
    password: {value: "", error: ""},
    confirmPassword: {value: "", error: ""},
  },

  resetFields: function (passwordHash) {
    set(passwordHash, 'oldPassword.value', "");
    set(passwordHash, 'oldPassword.error', "");
    set(passwordHash, 'password.value', "");
    set(passwordHash, 'password.error', "");
    set(passwordHash, 'confirmPassword.value', "");
    set(passwordHash, 'confirmPassword.error', "");
  },

  actions: {
    
    changePassword: function (user, hash) {
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        password: hash.password.value,
        confirmPassword: hash.confirmPassword.value,
      };

      if (hash.password.value !== hash.confirmPassword.value) {
        passwordError = "Provided passwords did not match.";
        set(hash, "password.value", "");
        set(hash, "password.error", passwordError);
        set(hash, "confirmPassword.value", "");
        set(hash, "confirmPassword.error", passwordError);
        return;
      } else {
        user.set('password', hash.password.value)
          .save()
          .then(function (user) { 
            self.resetFields(hash);
          })
          .fail(function (errors) {
            set(hash, "password.error", errors.password);             
            set(hash, "confirmPassword.error", errors.password);             
          });
      }
    }
  }

});