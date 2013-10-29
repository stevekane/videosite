var emailsMatch = Validations.fieldsMatch("email", "confirmEmail")
  , validateEmail = Validations.validateEmail("email")
  , checkIfBlank = Validations.checkIfBlank;
 
App.KaneChangeEmailFormComponent = App.KaneBaseFormComponent.extend({

  hash: {
    email: "",
    confirmEmail: ""
  },

  url: "",

  fieldValidations: [
    checkIfBlank("email"),
    checkIfBlank("confirmEmail"),
    validateEmail
  ],

  formValidations: [
    emailsMatch
  ],

  //override the normal submit method (not using url)
  submit: function (url, hash) {
    var user = this.get('user');
    return user.set('email', hash.email).save();
  }
  
});
