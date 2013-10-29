App.KaneSignupFormComponent = App.KaneBaseFormComponent.extend({
  
  hash: {
    email: "",
    password: "",
    confirmPassword: ""
  },

  url: "/user/create",

  fieldValidations: [
    Validations.validateEmail("email"),
    Validations.checkIfBlank("email"),
    Validations.checkIfBlank("password"),
    Validations.checkIfBlank("confirmPassword"),
  ],

  formValidations: [
    Validations.fieldsMatch("password", "confirmPassword") 
  ]

});
