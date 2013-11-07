var isValidEmail = {
  fn: Validations.validateEmail("email"),
  error: "Not a valid email",
  fields: ["email"]
}
var isEmailFilled = {
  fn: Validations.checkIfBlank("email"),
  error: "Please provide email",
  fields: ["email"]
}
var isPasswordFilled = {
  fn: Validations.checkIfBlank("password"),
  error: "Please provide password",
  fields: ["password"]
}
var isConfirmPasswordFilled = {
  fn: Validations.checkIfBlank("confirmPassword"),
  error: "Please confirm your password ",
  fields: ["confirmPassword"]
}

var doPasswordsMatch = {
  fn: Validations.fieldsMatch("password", "confirmPassword"),
  error: "Password and confirmation must match",
  fields: ["password", "confirmPassword"]
}

App.KaneSignupFormComponent = App.KaneFormComponent.extend({
  
  fields: {
    email: new Forms.Field("", ""),
    password: new Forms.Field("", ""),
    confirmPassword: new Forms.Field("", ""),
  },

  localFieldValidations: [
    isValidEmail,
    isEmailFilled,
    isPasswordFilled,
    isConfirmPasswordFilled,
  ],

  localFormValidations: [
    doPasswordsMatch
  ],

  submitFn: function (hash) {
    var data = {}
      , url = "/user/signup";

    data.email = hash.email.value;
    data.password = hash.password.value;
    return Ember.$.post(url, data);
  },

  successHandler: function (response) {
    this.sendAction("action", response.user);
  },

});
