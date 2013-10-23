var set = Ember.set;

//check if the provided email contains an "@"
function isValidEmail (hash) {
  return (hash.email.indexOf("@") !== -1) ? "" : "Invalid Email";
}

function compareEmails (hash) {
  return (hash.email === hash.confirmEmail) ? "" : "Emails do not match";
}

//method fired on form submission
function attemptChangeEmail (hash) {
  var self = this
    , user = this.get('user');

  set(self, "disabled", true);
  return user.set('email', hash.email).save();
}

function completeChangeEmail (response) {
  var hash = this.get('hash');

  set(this, "disabled", false);
  this.resetFields(hash);
  this.sendAction("action", response.user);
}

function declineChangeEmail (response) {
  var hash = this.get('hash');

  this.resetFields(hash);
  set(this, "disabled", false);
  set(this, "error", "Change Email Failed.");
}

App.KaneChangeEmailFormComponent = App.KaneFormComponent.extend({

  hash: {
    email: "",
    confirmEmail: ""
  },

  verifications: [isValidEmail, compareEmails],

  submitAction: attemptChangeEmail,

  handleSuccess: completeChangeEmail,

  handleFailure: declineChangeEmail,

});
