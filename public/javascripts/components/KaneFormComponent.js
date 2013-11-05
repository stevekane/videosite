var emailsMatch = Validations.fieldsMatch("newEmail", "confirmEmail")
  , validateEmail = Validations.validateEmail("newEmail")
  , checkIfBlank = Validations.checkIfBlank;


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

App.KaneFormComponent = Ember.Component.extend({

  fields: {},

  localFieldValidations: [],

  localFormValidations: [],

  remoteFieldValidations: [],

  remoteFormValidations: [],

});
