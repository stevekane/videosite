var set = Ember.set
  , alias = Ember.computed.alias;

App.LoginController = Ember.Controller.extend({

  needs: ['user'],

  activeUser: alias('controllers.user.content'),

  actions: {
    loadUser: function (user) {
      var storedUser = this.get('store').push('user', user);
      this.set('activeUser', storedUser);
      this.transitionToRoute("index"); 
    },

    //TODO: MOVE THIS TO SEPARATE FORM
    initiateResetPassword: function(hash) {
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
