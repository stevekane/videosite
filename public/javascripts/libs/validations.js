window.Validations = Ember.Namespace.create();

Validations.validateEmail = _.curry(function (fieldName, fields) {
  var value = fields[fieldName].value;
  return value.indexOf("@") > -1;
});

Validations.checkIfBlank = _.curry(function (fieldName, fields) {
  var value = fields[fieldName].value;

  return value !== "";
});

Validations.fieldsMatch = _.curry(function (fieldName1, fieldName2, fields) {
  var val1 = fields[fieldName1].value
    , val2 = fields[fieldName2].value;

  return val1 === val2;
});
