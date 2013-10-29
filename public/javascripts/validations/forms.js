Validations.fieldsMatch = _.curry(function (fieldName1, fieldName2, hash) {
  var val1 = hash[fieldName1]
    , val2 = hash[fieldName2];

  if (val1 !== val2) {
    throw new Error(fieldName1 + " does not match " + fieldName2); 
  }
});
