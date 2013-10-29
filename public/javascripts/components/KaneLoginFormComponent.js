var validateEmail = Validations.validateEmail("email")
  , checkIfBlank = Validations.checkIfBlank;

//Ember form component that uses our form functionality 
App.KaneLoginFormComponent = App.KaneBaseFormComponent.extend({
  
  hash: {
    email: "",
    password: ""
  },

  url: "/user/login",

  fieldValidations: [
    validateEmail,
    checkIfBlank("email"),
    checkIfBlank("password")
  ],

});
