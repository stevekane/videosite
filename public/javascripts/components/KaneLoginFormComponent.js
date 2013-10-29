//Ember form component that uses our form functionality 
App.KaneLoginFormComponent = App.KaneBaseFormComponent.extend({
  
  hash: {
    email: "",
    password: ""
  },

  url: "/user/login",

  fieldValidations: [
    Validations.validateEmail("email"),
    Validations.checkIfBlank("email"),
    Validations.checkIfBlank("password")
  ],

});
