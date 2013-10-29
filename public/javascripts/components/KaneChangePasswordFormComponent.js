var passwordsMatch = Validations.fieldsMatch("password", "confirmPassword");

App.KaneChangePasswordFormComponent = App.KaneBaseFormComponent.extend({

  hash: {
    oldPassword: "",
    password: "",
    confirmPassword: ""
  },

  url: "",

  formValidations: [
    passwordsMatch 
  ], 

  //override the normal submit
  submit: function (url, hash) {
    var user = this.get('user')
      , data = {
      id: user.get('id'),
      email: user.get('email'),
      oldpassword: hash.oldPassword,
      password: hash.password
    };
  
    return Ember.$.post("/user/pwchange", data);
  }

});
