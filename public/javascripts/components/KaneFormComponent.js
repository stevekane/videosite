var set = Ember.set
  , alias = Ember.computed.alias;

function setForDuration (context, key, value, duration) {
  set(context, key, value);
  Ember.run.later(context, function () {
    set(context, key, ""); 
  }, duration);
}

App.KaneFormComponent = Ember.Component.extend({

  tagName: "form",

  disabled: false,

  hash: {},

  errorDuration: 3000,

  setForDuration: setForDuration,

  verifications: [],

  /*
  It is recommended that your submitAction set disbaled true while
  inflight and then back to false.  This will disable all inputs
  in the form during flight
  NOTE: "this" is set to the formComponent in all callbacks
  */
  submitAction: Ember.K,

  handleSuccess: Ember.K,

  handleFailure: Ember.K,

  resetFields: function (hash) {
    Object.keys(hash).forEach(function (key) {
      set(hash, key, ""); 
    });
    return hash;
  },

  //return true if all verification fules pass
  //else returns false and sets error to provided error 
  clientSideVerify: function (hash, verifications) {
    var self = this
      , errorDuration = this.get('errorDuration');

    var error = verifications.map(function (fn) {
      return fn.call(self, hash); 
    }).find(function (err) {
      return (!!err); 
    });

    if (error) {
      setForDuration(self, "error", error, errorDuration);
      return false;
    } else {
      return true;
    }
  },

  actions: {

    submit: function () {
      var self = this
        , hash = this.get('hash')
        , verifications = this.get('verifications')
        , submitAction = this.get('submitAction');

      if (self.clientSideVerify(hash, verifications)) {
        self.submitAction.call(self, hash)
        .then(function (response) { self.handleSuccess.call(self, response); })
        .fail(function (response) { self.handleFailure.call(self, response); })
      }
    },
  }

});


//check if the provided email contains an "@"
function isValidEmail (hash) {
  var error = (hash.email.indexOf("@") !== -1) 
    ? "" 
    : "Invalid email";
  return error;
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

  verifications: [isValidEmail],

  submitAction: attemptLogin,

  handleSuccess: completeLogin,

  handleFailure: declineLogin,

});
