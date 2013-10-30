var validateEmail = Validations.validateEmail("email")
  , checkIfBlank = Validations.checkIfBlank
  , passwordsMatch = Validations.fieldsMatch("password", "confirmPassword");
  

App.KaneSignupFormComponent = App.KaneBaseFormComponent.extend({
  
  hash: {
    email: "",
    password: "",
    confirmPassword: ""
  },

  url: "/user/create",

  fieldValidations: [
    validateEmail,
    checkIfBlank("email"),
    checkIfBlank("password"),
    checkIfBlank("confirmPassword"),
  ],

  formValidations: [
    passwordsMatch
  ]

});
