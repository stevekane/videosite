var doPasswordsMatch = {
  fn: Validations.fieldsMatch("newPassword", "confirmPassword"),
  error: "New password and confirmation must match",
  fields: ["newPassword", "confirmPassword"]
}

App.KaneChangePasswordFormComponent = App.KaneFormComponent.extend({

  fields: {
    oldPassword: new Forms.Field("", ""),
    newPassword: new Forms.Field("", ""),
    confirmPassword: new Forms.Field("", "")
  },

  localFormValidations: [
    doPasswordsMatch
  ], 

  submitFn: function (hash) {
    var url = "/user/changePassword";
    var data = {
      oldPassword: hash.oldPassword.value,
      newPassword: hash.newPassword.value
    };
  
    return Ember.$.post(url, data);
  },

  successHandler: function (response) {
    this.sendAction("action", response.user); 
  },

  failureHandler: function (err) {
    set(this, "error", err.responseJSON.message || "Change password failed");  
  }

});
