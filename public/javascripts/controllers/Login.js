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
    },
    initiateResetPassword: function(hash){
      var resetConfirm = 
        confirm("Are you sure you would like to initiate the password reset process?");
      if(resetConfirm){
        var self = this;
        
        $.ajax({
          type: 'POST',
          url: "http://localhost:3000/user/pwresetrequest",
          data: {
            email: hash.email, 
          },
          success: function (response) {
            set(self, "passwordResetMsg", 
              "Request sent. Please check your email.");   
            self.resetFields(hash);
          },
          error: function (response) {
            var errMsg = JSON.parse(response.responseText)["error"];
            console.log(errMsg);
            set(self, "passwordResetMsg", errMsg); 
          }
        })
      }
    }
  }
});
