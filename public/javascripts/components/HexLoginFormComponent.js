require("behaviors/login.js");

var set = Ember.set
  , alias = Ember.computed.alias;

//jquery implementation of submit
var $submit = function (form) {
  return Ember.$.ajax("/user/login", {type: "POST", data: form});
}

//handleErrors w/ Ember
var handleError = function (error) {
  set(this, "disabled", false);
  set(this, "error", error.message);
}

//handle success w/ Ember
var handleSuccess = function (result) {
  set(this, "disabled", false);
  this.sendAction("action", result.user);
}

//handleFailure w/ Ember
var handleFailure = function (error) {
  set(this, "disabled", false);
  set(this, "error", "Invalid Login Credentials");
}

//Ember form component that uses our form functionality 
App.HexLoginFormComponent = Ember.Component.extend({
  
  hash: {
    email: "",
    password: ""
  },

  actions: {
    submit: function (hash) {
      set(this, "disabled", true);
      Behaviors.login.submit( 
        this, 
        hash, 
        $submit, 
        handleError, 
        handleSuccess, 
        handleFailure
      );
    }
  }
});
