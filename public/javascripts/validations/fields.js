Validations.validateEmail = _.curry(function (fieldName, hash) {
  var value = hash[fieldName];
  console.log(value);
  if (value.indexOf("@") === -1) {
    throw new Error(fieldName + " must contain @");
  }
});

Validations.checkIfBlank = _.curry(function (fieldName, hash) {
  var value = hash[fieldName];

  if (value === "" || value === null || value === undefined) {
    throw new Error(fieldName + " must not be blank"); 
  }
});
