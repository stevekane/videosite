var validateEmail = Validations.validateEmail("email")
  , checkIfBlank = Validations.checkIfBlank
  , set = Ember.set;
 
App.KaneResetPasswordFormComponent = App.KaneBaseFormComponent.extend({

  showForm: false,
  
  hash: {
    email: ""
  },

  url: "user/pwreset",

  fieldValidations: [
    checkIfBlank("email"),
    validateEmail
  ],

  actions: {
    toggleForm: function () {
      return this.toggleProperty("showForm");
    } 
  }

});
