var set = Ember.set
  , alias = Ember.computed.alias;

var clearAndSetError = function (property, error) {
  set(property, "value", "");
  set(property, "error", error);
};


App.SignupController = Ember.Controller.extend({

  needs: ['user'],

  activeUser: alias('controllers.user.content'),

  newAccountHash: {
    email: {value: "", error: ""},
    password: {value: "", error: ""},
    confirmPassword: {value: "", error: ""}
  },

  resetFields: function (newAccountHash) {
    set(newAccountHash, 'email.value', "");
    set(newAccountHash, 'email.error', "");
    set(newAccountHash, 'password.value', "");
    set(newAccountHash, 'password.error', "");
    set(newAccountHash, 'confirmPassword.value', "");
    set(newAccountHash, 'confirmPassword.error', "");
  },

  actions: {
    
    signUp: function (hash) {
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        email: hash.email.value,
        password: hash.password.value,
        confirmPassword: hash.confirmPassword.value,
      };
      
      if (hash.password.value !== hash.confirmPassword.value) {
        passwordError = "Provided passwords did not match."
        set(hash, "password.value", "");
        set(hash, "confirmPassword.value", "");
        set(hash, "password.error", passwordError);
        set(hash, "confirmPassword.error", passwordError);
        return;
      } else {
        store.createRecord('user', values)
          .save()
          .then(function (user) { 
            self.set('activeUser', user);
            self.resetFields(hash);
            self.transitionToRoute('index');
          })
          .fail(function (errors) {
            set(hash, "email.error", errors.email);             
            set(hash, "password.error", errors.password);             
            set(hash, "confirmPassword.error", errors.confirmPassword);             
          });
      }
    }
  }
});
