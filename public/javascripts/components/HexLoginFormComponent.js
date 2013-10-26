var set = Ember.set
  , alias = Ember.computed.alias;

var validateEmail = function (email) {
  if (email.indexOf("@") === -1) {
    throw new Error("Valid email must contain @");
  }
}

var reportErrors = function (err) {
  console.log(err.message);
}

var attemptSubmission = function (form) {
  console.log("Submitting");
}

var badEmailForm = {
  email: "smaugdoomsday.gov",
  password: ""
}

var noPwForm = {
  email: "smaugh@doomsday.gov",
  password: ""
}

var goodForm = {
  email: "smaugh@doomsday.gov",
  password: "123456"
}

var validateFields = function (form) {
  validateEmail(form.email); 
}

var validateForm = function (form) {
  if (form.email === "" || form.password === "") {
    throw new Error("Must provide both email and password"); 
  }
}

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

//TESTS OF LOCAL STUFF
//submit(this, badEmailForm, localSubmit, localHandleError, localHandleSuccess, localHandleFailure);
//submit(this, noPwForm, localSubmit, localHandleError, localHandleSuccess, localHandleFailure);
//submit(this, goodForm, localSubmit, localHandleError, localHandleSuccess, localHandleFailure);
//

//jquery implementation of submit
var $submit = function (form) {
  return Ember.$.ajax("/user/login", {type: "POST", data: form});
}

var handleErrorEmber = function (error) {
  set(this, "disabled", false);
  set(this, "error", error.message);
}

var handleSuccessEmber = function (result) {
  set(this, "disabled", false);
  this.sendAction("action", result.user);
}

var handleFailureEmber = function (error) {
  set(this, "disabled", false);
  set(this, "error", "Invalid Login Credentials.");
}

App.HexLoginFormComponent = Ember.Component.extend({
  
  hash: {
    email: "",
    password: ""
  },

  actions: {
    submit: function (hash) {
      set(this, "disabled", true);
      //submit( this, hash, localSubmit, localHandleError, 
      //        localHandleSuccess, localHandleFailure);
      submit(this, hash, $submit, handleErrorEmber, handleSuccessEmber, handleFailureEmber);
    }
  }
});
