var set = Ember.set;

function comparePasswords (hash) {
  return (hash.password === hash.confirmPassword) ? "" : "Passwords do not match";
}

//method fired on form submission
function attemptPasswordChange (hash) {
  var self = this
    , user = this.get('user')
    , data = {
      id: user.get('id'),
      email: user.get('email'),
      oldpassword: hash.oldPassword,
      password: hash.password
    };
  
  set(self, "disabled", true);
  return Ember.$.ajax("/user/pwchange", {type: "POST", data: data});
}

function completePasswordChange(response) {
  var hash = this.get('hash');

  set(this, "disabled", false);
  this.resetFields(hash);
}

function declinePasswordChange (response) {
  var hash = this.get('hash');

  this.resetFields(hash);
  set(this, "disabled", false);
  set(this, "error", "Password Change Failed.");
}

App.KaneChangePasswordFormComponent = App.KaneFormComponent.extend({

  hash: {
    oldPassword: "",
    password: "",
    confirmPassword: ""
  },

  verifications: [comparePasswords],

  submitAction: attemptPasswordChange,

  handleSuccess: completePasswordChange,

  handleFailure: declinePasswordChange,

});
