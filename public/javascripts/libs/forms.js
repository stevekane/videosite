window.Forms = Ember.Namespace.create();

Forms.Promise = window.Ember.RSVP.Promise || window.RSVP.Promise || null;
Forms.allPromises = window.Ember.RSVP.all || window.RSVP.all || null;
Forms.hashPromises = window.Ember.RSVP.hash || window.RSVP.all || null;

if (!window.Ember.RSVP && !window.RSVP) {
  throw new Error("No implementation of RSVP found!");
}

//STRUCTURAL TYPING DATA OBJECTS
Forms.Field = function (value, error) {
  this.value = value;
  this.error = error;
}

Forms.Result = function (fields, passed, error) {
  this.fields = fields;
  this.passed = passed;
  this.error = error;
}

Forms.Validation = function (fn, error, fields) {
  this.fn = fn;
  this.error = error;
  this.fields = fields;
}

Forms.FieldError = function (field, error) {
  this.field = field;
  this.error = error;
}

/*
@validations: [Forms.Validation]
@fields: [Forms.Field]
@returns: [Forms.Result]
*/
Forms.runLocalValidations = function (validations, fields) {
  return _.map(validations, function (validation) {
    var passed = validation.fn(fields)
      , error = passed ? "" : validation.error;
      
    return new Forms.Result(validation.fields, passed, error);
  });
}

/*
@validations: [Forms.Validation]
@fields: [Forms.Field]
returns Promise
        @resolvesWith: [Forms.Result]
        @rejectsWith: [Forms.Result]
*/
Forms.runRemoteValidations = function (validations, fields) {
  var remotePromises = _.map(validations, function (validation) {
    return fn(fields); 
  });

  return Forms.Promise( function (resolve, reject) {
    return Forms.allPromises(remotePromises)
    .then(function (results) {

      //the order the remote validations were in is the same as
      //the results returned.  thus we can use validations[index]
      var Results = _.map(results, function (result, index) {
        var passed = result
          , validation = validations[index]
          , error = passed ? "" : validation.error;

        return new Forms.Result(validation.fields, passed, error);
      });

      return resolve(Results);
    })
    .fail(function (err) {
      return reject(err); 
    })
  });
}

/*
@results: [Forms.Result]
@returns: Boolean
*/
Forms.checkForErrors = function (results) {
  return _.any(results, {passed: false});
}

/*
@results: [Forms.Result]
@returns: Promise
          @resolvesWith: [Forms.Result]
          @rejectsWith: [Forms.Result]
*/
Forms.checkForErrorsPromised = function (results) {
  return Forms.Promise(function (resolve, reject) {
    var remoteErrors = Forms.checkForErrors(results);

    if (remoteErrors) {
      return reject(results); 
    } else {
      return resolve(results);  
    }
  });
}

/*
@results: [Forms.Result]
@returns: [Forms.FieldError]
*/
Forms.buildFieldErrors = function (results) {
  return _.chain(results)
    .filter({passed: false})
    .map(function (result) {
      return _.map(result.fields, function (field) {
        return new Forms.FieldError(field, result.error);
      })
    })
    .flatten()
    .value();
}

