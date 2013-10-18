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
    email: "",
    password: ""
  },
  
  resetFields: function (loginHash) {
    set(loginHash, 'email', "");
    set(loginHash, 'password', "");
  },
    
  actions:{
  
    attemptLogin: function (hash) {
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        email: hash.email,
        password: hash.password,
      };

      $.ajax({
        type: 'POST',
        url: "http://localhost:3000/user/login",
        data: {
          email: values.email, 
          password: values.password
        },
        success: function (response) {
          var emberUser = store.push('user', response.user);
          self.set('activeUser', emberUser);
          self.resetFields(hash);
          self.transitionToRoute('index');
        },
        error: function (response) {
          set(self, "error", "Unauthorized"); 
        }
      })
    }
  }
});
