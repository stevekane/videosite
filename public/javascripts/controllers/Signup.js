var set = Ember.set
  , alias = Ember.computed.alias;

App.SignupController = Ember.Controller.extend({

  needs: ['user'],

  activeUser: alias('controllers.user.content'),

  error: "",

  newAccountHash: {
    email: "",
    password: "",
    confirmPassword: ""
  },

  resetFields: function (newAccountHash) {
    set(newAccountHash, 'email', "");
    set(newAccountHash, 'password', "");
    set(newAccountHash, 'confirmPassword', "");
  },

  actions: {
    
    signUp: function (hash) {
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        email: hash.email,
        password: hash.password,
      };
      
      if (hash.password !== hash.confirmPassword) {
        set(self, "error", "Provided passwords did not match.");
        set(hash, "password", "");
        set(hash, "confirmPassword", "");
        return;
      } else {
        store.createRecord('user', values)
        .save()
        .then(function (user) { 
          self.set('activeUser', user);
          self.resetFields(hash);
          self.transitionToRoute('index');
        })
        .fail(function (error) {
          console.log(error);
          set(self, "error", JSON.parse(error.responseText)['error']);             
        });
      }
    }
  }
});
