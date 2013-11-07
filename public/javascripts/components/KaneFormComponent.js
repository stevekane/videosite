var set = Ember.set;

/*
Bind values of fields hash to form input elements (or other mechanisms)

Fields consist of "value", "error"
fields: {
  fieldName: {value: "", error: ""}
}

Submission has four initial phases:
  localFieldValidation
  localFormValidation
  remoteFieldValidation
  remoteFormValidation

*NOTE* All validations take the Fields object as their last parameter

Field validations are performed by providing "fieldName", and function
Form validations are performed by provided "fieldNames" array, and a function

Local validations are performed syncronously and return objects of the format:
{passed: Boolean, fields: [], error: "Some error message or empty string if passed"}
Remote validations are performed asyncronously and will return 
{passed: Boolean, fields: [], error: "Some error message or empty string if passed"}

We check after each round of validations to see if there are any failures
If there are, we display the error by assigning this value to the appropriate
"error" for the field

If all validations pass, a submit function is fired which *MUST* return a promise
When the promise resolves, we will call "onSubmitSuccess", or "onSubmitError"
*NOTE*
  while submission is unresolved, we will set disabled to true on the component
  This will prevent changes being made to any field values 
  and also prevents multiple submits

*/

function setFieldErrors (fields, errors) {
  errors.forEach(function (error) {
    set(fields[error.field], "error", error.error);
  });
}

function resetErrors (fields) {
  //reset field errors
  _.each(fields, function (field) {
    set(field, "error", ""); 
  });
  //reset form-wide error
  set(this, "error", "");
}

App.KaneFormComponent = Ember.Component.extend({

  fields: {},

  disabled: false,

  enableForm: function () {
    this.set('disabled', false); 
  },

  disableForm: function () {
    this.set('disabled', true); 
  },

  localFieldValidations: [],

  localFormValidations: [],

  remoteFieldValidations: [],

  remoteFormValidations: [],

  setFieldErrors: setFieldErrors,

  resetErrors: resetErrors,

  //return a thennable from this
  submitFn: function (hash) {
    return Ember.RSVP.Promise(function (resolve, reject) {
      resolve({});
    });
  },

  //default behavior is to broadcast action with reponses data
  successHandler: function (json) {
    this.sendAction("action", json); 
  },

  //default behavior is to set "error" property to responseText.error
  failureHandler: function (err) {
    var error = err.responseJSON.error 
      || err.responseText 
      || "Submission unsuccessful";
    set(this, "error", error);
  },

  actions: {
    submit: function () {
      var self = this
        , localFieldVals = this.get('localFieldValidations')
        , localFormVals = this.get('localFormValidations')
        , remoteFieldVals = this.get('remoteFieldValidations')
        , remoteFormVals = this.get('removeFormValidations')
        , fields = this.get('fields')
        , fieldErrors
        , formErrors;

      this.resetErrors(fields);

      //handle local field validations
      var fieldResults = Forms.runLocalValidations(localFieldVals, fields);
      if (Forms.checkForErrors(fieldResults)) {
        fieldErrors = Forms.buildFieldErrors(fieldResults);
        return this.setFieldErrors(fields, fieldErrors);
      }

      //handle local form validations
      var formResults = Forms.runLocalValidations(localFormVals, fields);
      if (Forms.checkForErrors(formResults)) {
        formErrors = Forms.buildFieldErrors(formResults);
        return this.setFieldErrors(fields, formErrors);
      }

      //handle remote field validation
      //NOT IMPLEMENTED YET
      //handle remote form validation
      //NOT IMPLEMENTED YET
      
      //disable the form for remote roundtrip
      self.disableForm();

      //handle submission
      self.submitFn(fields)
      .then(function (response) {
        return self.successHandler.call(self, response);
      })
      .fail(function (err) {
        return self.failureHandler.call(self, err);
      })
      //re-enable the form regardless of outcome
      .then(function () { self.enableForm.call(self); })
      .fail(function () { self.enableForm.call(self); })
    }, 
  }
});
