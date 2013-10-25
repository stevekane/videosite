var set = Ember.set
  , alias = Ember.computed.alias;

//check if the provided email contains an "@"
function isValidEmail (hash) {
  return (hash.email.indexOf("@") !== -1) ? "" : "Invalid Email";
}

//method fired on form submission
function attemptLogin (hash) {
  var self = this;

  set(self, "disabled", true);
  return Ember.$.ajax("/user/login", {type: "POST", data: hash});
}

function completeLogin (response) {
  var hash = this.get('hash');

  set(this, "disabled", false);
  this.resetFields(hash);
  this.sendAction("action", response.user);
}

function declineLogin (response) {
  var hash = this.get('hash');

  this.resetFields(hash);
  set(this, "disabled", false);
  set(this, "error", "Login Failed");
}
App.KaneLoginFormComponent = App.KaneFormComponent.extend({

  hash: {
    email: "",
    password: "",
  },

  retrieveStoredCredentials: function () {
    var loginCredentials = App.localStore.get('loginCredentials');

    if (loginCredentials) {
      this.set('hash.email', loginCredentials.email);
    }
  }.on("init"),

  verifications: [isValidEmail],

  submitAction: attemptLogin,

  handleSuccess: completeLogin,

  handleFailure: declineLogin,

});
