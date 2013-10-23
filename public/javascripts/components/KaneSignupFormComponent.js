var set = Ember.set;

//check if the provided email contains an "@"
function isValidEmail (hash) {
  return (hash.email.indexOf("@") !== -1) ? "" : "Invalid Email";
}

function comparePasswords (hash) {
  return (hash.password === hash.confirmPassword) ? "" : "Passwords do not match";
}

//method fired on form submission
function attemptSignup (hash) {
  var self = this;

  set(self, "disabled", true);
  return Ember.$.ajax("/user/create", {type: "POST", data: hash});
}

function completeSignup (response) {
  var hash = this.get('hash');

  set(this, "disabled", false);
  this.resetFields(hash);
  this.sendAction("action", response.user);
}

function declineSignup (response) {
  var hash = this.get('hash');

  this.resetFields(hash);
  set(this, "disabled", false);
  set(this, "error", "Signup failed");
}

App.KaneSignupFormComponent = App.KaneFormComponent.extend({

  hash: {
    email: "",
    password: "",
    confirmPassword: ""
  },

  verifications: [isValidEmail, comparePasswords],

  submitAction: attemptSignup,

  handleSuccess: completeSignup,

  handleFailure: declineSignup,

});
