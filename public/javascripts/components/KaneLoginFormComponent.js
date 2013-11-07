var set = Ember.set;

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

App.KaneLoginFormComponent = App.KaneFormComponent.extend({
  
  fields: {
    email: new Forms.Field("", ""),
    password: new Forms.Field("", "")
  },

  localFieldValidations: [
    isValidEmail,
    isEmailFilled,
    isPasswordFilled
  ],

  submitFn: function (hash) {
    var data = {}
      , url = "/user/login";

    data.email = hash.email.value;
    data.password = hash.password.value;
    return Ember.$.post(url, data);
  },

  successHandler: function (response) {
    this.sendAction("action", response.user);
  },

  failureHandler: function () {
    set(this, "error", "Invalid credentials");
  },

});
