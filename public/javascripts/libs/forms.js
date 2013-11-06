window.Forms = Ember.Namespace.create();

Forms.Promise = window.Ember.RSVP.Promise || window.RSVP.Promise || null;
Forms.allPromises = window.Ember.RSVP.all || window.RSVP.all || null;

if (!Forms.Promise || !Forms.allPromises) {
  throw new Error("No implementation of RSVP found!");
}

//OLD STUFF STILL IN USE.  SHOULD REMOVE ONCE REWRITTEN
var callValidation = _.curry(function (hash, validationFn) {
  return validationFn(hash);
});

//should perform sequence of validations provided
Forms.validate = _.curry(function (fieldValidations, formValidations, hash) {
  fieldValidations.forEach(callValidation(hash));
  formValidations.forEach(callValidation(hash));
});
// /OLD STUFF

//NEW STUFF
Forms.Field = function (value, error) {
  this.value = value;
  this.error = error;
}

Forms.Result = function (fields, passed, error) {
  this.fields = fields;
  this.passed = passed;
  this.error = error;
}

Forms.runLocalValidations = function (validations, fields) {
  return _.map(validations, function (validation) {
    var passed = validation.fn(fields)
      , error = passed ? "" : validation.error;
      
    return new Forms.Result(validation.fields, passed, error);
  });
}

//returns true or false depending on whether any results return passed=false
Forms.checkForErrors = function (results) {
  return _.any(results, {passed: false});
}

//for user in error chains, similar promisified semantics to sync above
Forms.checkForErrorsPromised = function (results) {
  return Forms.Promise(function (resolve, reject) {
    var remoteErrors = Forms.checkForErrors(results);

    if (remoteErrors) {
      reject(remoteErrors); 
    } else {
      resolve(results);  
    }
  });
}

//REWRITE
Forms.buildFieldErrors = function (results) {
  return _.chain(results)
    .filter({passed: false})
    .map(function (result) {
      return _.map(result.fields, function (field) {
        return {field: field, error: result.error}; 
      })
    })
    .flatten()
    .value();
}

/*
NOTE: we don't specify any particular promise implementation here
We are currently running in series, this could be changed to parallel (perhaps)
Only that we expect all functions to provide thennables
*/
Forms.runRemoteValidations = function (validationFunctions, fields) {
  var remotePromises = _.map(validationFunctions, function (fn) {
    return fn(fields); 
  });

  return Forms.Promise( function (resolve, reject) {
    return Forms.allPromises(remotePromises)
    .then(function (results) {
      return resolve(results);
    })
    .fail(function (err) {
      return reject(err); 
    })
  });
}
