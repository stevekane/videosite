var validateEmail = _.curry(function (fieldName, fields) {
  var value = fields[fieldName].value;

  return value.indexOf("@") > -1;
});

var checkIfBlank = _.curry(function (fieldName, fields) {
  var value = fields[fieldName].value;

  return value !== "";
});

//Ember form component that uses our form functionality 
App.KaneLoginFormComponent = App.KaneFormComponent.extend({
  
  fields: {
    email: new Forms.Field("", ""),
    password: new Forms.Field("", "")
  },

  localFieldValidations: [
    {fn: validateEmail("email"), error: "Not a valid email", fields: ["email"]},
    {fn: checkIfBlank("email"), error: "Please provide an email", fields: ["email"]},
    {fn: checkIfBlank("password"), error: "Please provide a password", fields: ["password"]},
  ],

  submitFn: function (hash) {
    var data = {}
      , url = "/user/login";

    data.email = hash.email.value;
    data.password = hash.password.value;
    return Ember.$.post(url, data);
  },

  successHandler : function (response) {
    this.sendAction("action", response);
  },

  failureHandler: function (err) {
    console.log(err);
    this.set("error", err.message ? err.message : "Login error");
  }

});
