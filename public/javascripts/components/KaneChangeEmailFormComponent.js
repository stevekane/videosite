var emailsMatch = Validations.fieldsMatch("email", "confirmEmail")
  , validateEmail = Validations.validateEmail("email")
  , checkIfBlank = Validations.checkIfBlank;
 
App.KaneChangeEmailFormComponent = App.KaneBaseFormComponent.extend({

  hash: {
    newEmail: "",
    email: "",
    confirmEmail: ""
  },

  url: "",

  fieldValidations: [
    checkIfBlank("newEmail"),
    checkIfBlank("confirmEmail"),
    validateEmail
  ],

  formValidations: [
    emailsMatch
  ],

  //TODO: SHOULD LOAD THE UPDATED USER
  //override the normal submit method (not using url)
  submit: function (url, hash) {
    var user = this.get('user');
    var data = {
      id: user.get('id'),
      email: hash.email,
      newEmail: hash.newEmail
    };
    return Ember.$.post("/user/changeEmail", data)
    .then(function (user) {
      console.log("new user is", user); 
    })
  }
  
});
