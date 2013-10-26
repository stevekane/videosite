var set = Ember.set
  , alias = Ember.computed.alias;

var validateEmail = function (email) {
  if (email.indexOf("@") === -1) {
    throw new Error("Valid email must contain @");
  }
}

var validateForm = function (form) {
  if (form.email === "" || form.password === "") {
    throw new Error("Must provide both email and password"); 
  }
}

var validateFields = function (form) {
  validateEmail(form.email); 
}

/*
Local suite of functions for testing form lifecycle
*/
//test of local submit function
var localSubmit = function (form) {
  return Ember.RSVP.Promise(function (resolve, reject) {
    Ember.run.next(this, function () {resolve(form);})
  });
}

var localHandleError = function (error) {
  console.log(error.message);
}

var localHandleSuccess = function (result) {
  console.log("Success: ", result);
}

var localHandleFailure = function (error) {
  console.log(error.message);
}

//TESTS OF LOCAL STUFF
//submit(this, badEmailForm, localSubmit, localHandleError, localHandleSuccess, localHandleFailure);
//submit(this, noPwForm, localSubmit, localHandleError, localHandleSuccess, localHandleFailure);
//submit(this, goodForm, localSubmit, localHandleError, localHandleSuccess, localHandleFailure);
//


//LOGIN FORM SUBMIT FUNCTION (generic really, could be partially applied)
//With correct functions to provide better interface?
//only assumption is that submitFn returns a thennable
var submit = function (context, form, submitFn, errorFn, successFn, failFn) {
  try {
    validateFields(form);
    validateForm(form);
  } catch (err) {
    return errorFn.call(context, err); 
  }

  submitFn.call(context, form)
  .then(function (result) {successFn.call(context, result);})
  .then(null, function (error) {failFn.call(context, error);});
}

//jquery implementation of submit
var $submit = function (form) {
  return Ember.$.ajax("/user/login", {type: "POST", data: form});
}

//handleErrors w/ Ember
var handleErrorEmber = function (error) {
  set(this, "disabled", false);
  set(this, "error", error.message);
}

//handle success w/ Ember
var handleSuccessEmber = function (result) {
  set(this, "disabled", false);
  this.sendAction("action", result.user);
}

//handleFailure w/ Ember
var handleFailureEmber = function (error) {
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
      submit(this, hash, $submit, handleErrorEmber, handleSuccessEmber, handleFailureEmber);
    }
  }
});
