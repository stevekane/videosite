window.Forms = Ember.Namespace.create();

var callValidation = _.curry(function (hash, validationFn) {
  return validationFn(hash);
});

//should perform sequence of validations provided
Forms.validate = _.curry(function (fieldValidations, formValidations, hash) {
  fieldValidations.forEach(callValidation(hash));
  formValidations.forEach(callValidation(hash));
});
