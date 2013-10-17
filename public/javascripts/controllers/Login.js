var set = Ember.set
  , alias = Ember.computed.alias;

var clearAndSetError = function (property, error) {
  set(property, "value", "");
  set(property, "error", error);
};

function loginUser(user, store){
  store.load("user", user);
};

App.LoginController = Ember.Controller.extend({
  needs: ['user'],
  activeUser: alias('controllers.user.content'),
  
  loginHash: {
    email: {value: "", error: ""},
    password: {value: "", error: ""}
  },
  
  resetFields: function (loginHash) {
    set(loginHash, 'email.value', "");
    set(loginHash, 'email.error', "");
    set(loginHash, 'password.value', "");
    set(loginHash, 'password.error', "");
  },
    
  actions:{
  
    attemptLogin: function(hash){
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        email: hash.email.value,
        password: hash.password.value,
      };

      $.ajax({
        type: 'POST',
        url: "http://localhost:3000/user/login",
        data: {
          email: values.email, 
          password: values.password
        },
        success: function(response){
          var user = response.user.user;
          var emberUser = store.push('user', user);
          self.set('activeUser', emberUser);
          self.resetFields(hash);
          self.transitionToRoute('index');
        },
        error: function(response){
          set(hash, "email.error", response.responseText);
          set(hash, "password.error", response.responseText);
        }
      })
    }
  }
});
