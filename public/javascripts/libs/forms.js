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
  this.passed = passed;
  this.fields = fields;
  this.error = error;
}

function findFailures (result) {
  return !result.passed;
}

Forms.runLocalValidations = function (validationFunctions, fields) {
  return _.map(validationFunctions, function (fn) {
    return fn(fields);   
  });
}

//returns an array of results that have errors, else returns false
Forms.checkForErrors = function (results) {
  var failures = _.filter(results, findFailures);

  return failures.length === 0 ? false : failures;
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
