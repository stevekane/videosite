var set = Ember.set
  , alias = Ember.computed.alias;

function sendPasswordChange(user, hash, self){
  var url = "http://localhost:3000/user/pwchange";
  
  $.ajax({
    url: url,
    type: 'POST',
    data: {
            id: user.id,
            email: user.email,
            oldpassword: hash.oldPassword,
            password: hash.password
          },
    success: function(){
      self.resetFields(hash);
      alert("Password changed successfully!");
      
    },
    error: function(error){
      self.resetFields(hash);
      alert("Password was not changed!");
      set(self, "error", JSON.parse(error.responseText)['error']);
    }  
  })
}
  
App.AccountChangePasswordController = Ember.ObjectController.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

  newPasswordHash: {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  },

  resetFields: function (passwordHash) {
    set(passwordHash, 'oldPassword', "");
    set(passwordHash, 'password', "");
    set(passwordHash, 'confirmPassword', "");
  },

  actions: {
    
    changePassword: function (user, hash) {
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        password: hash.password,
        confirmPassword: hash.confirmPassword,
      };

      if (hash.password !== hash.confirmPassword) {
        passwordError = "Provided passwords did not match.";
        set(hash, "password", "");
        set(hash, "confirmPassword", "");
        set(this, "error", passwordError);
        return;
      } else {
        // user.set('password', hash.password.value)
          // .save()
          // .then(function (user) { 
            // self.resetFields(hash);
          // })
          // .fail(function (errors) {
            // set(hash, "password.error", errors.password);             
            // set(hash, "confirmPassword.error", errors.password);             
          // });
          sendPasswordChange(user, hash, self);
      }
    }
  }

});
