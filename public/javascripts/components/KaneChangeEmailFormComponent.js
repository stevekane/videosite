var set = Ember.set;

var isEmailBlank = {
  fn: Validations.checkIfBlank("newEmail"),
  error: "Please enter an email ",
  fields: ["newEmail"]
}

var isConfirmEmailBlank = {
  fn: Validations.checkIfBlank("confirmEmail"),
  error: "Please confirm your email",
  fields: ["confirmEmail"]
}

var doEmailsMatch = {
  fn: Validations.fieldsMatch("newEmail", "confirmEmail"),
  error: "Email and confirmation must match",
  fields: ["newEmail", "confirmEmail"]
}
 
App.KaneChangeEmailFormComponent = App.KaneFormComponent.extend({

  fields: {
    newEmail: new Forms.Field("", ""),
    confirmEmail: new Forms.Field("", "")
  },

  localFieldValidations: [
    isEmailBlank,
    isConfirmEmailBlank
  ],

  localFormValidations: [
    doEmailsMatch 
  ],

  submitFn: function (hash) {
    var url = "/user/changeEmail";
    var data = {
      newEmail: hash.newEmail.value
    };

    return Ember.$.post(url, data);
  },

  successHandler: function (response) {
    this.sendAction("action", response.user);
  },

  failureHandler: function (err) {
    set(this, "error", err.responseJSON.message || "Change email failed");
  },

});
