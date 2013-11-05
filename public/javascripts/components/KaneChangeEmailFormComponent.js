var emailsMatch = Validations.fieldsMatch("newEmail", "confirmEmail")
  , validateEmail = Validations.validateEmail("newEmail")
  , checkIfBlank = Validations.checkIfBlank;
 
App.KaneChangeEmailFormComponent = App.KaneBaseFormComponent.extend({

  hash: {
    newEmail: "",
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
      email: user.get('email'),
      newEmail: hash.newEmail
    };
    return Ember.$.post("/user/changeEmail", data)
    .then(function (json) {
      return json.user; 
    });
  }
  
});
