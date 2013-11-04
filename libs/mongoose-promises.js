var Q = require('q')
  , promisify = Q.ninvoke;

/*
schema.methods adds instance methods
schema.statics adds class methods (to the model)
*/

var promisifyMongoose = function (schema, options) {
  schema.methods.removePromised = function () {
    return promisify(this, "remove");
  };

  //Mongoose spec returns an array here
  //We want the first element which is the model
  schema.methods.savePromised = function () {
    var savePromise = Q.defer();

    promisify(this, "save")
    .then(function (array) {
      return savePromise.resolve(array[0]); 
    })
    .fail(savePromise.reject)

    return savePromise.promise;
  };

  schema.statics.countPromised = function (hash) {
    return promisify(this, "count", hash); 
  };

  schema.statics.createPromised = function (hash) {
    return promisify(this, "create", hash); 
  };

  schema.statics.distinctPromised = function (field, hash) {
    return promisify(this, "distinct", field, hash); 
  };

  schema.statics.findPromised = function (conditions, fields, options) {
    return promisify(this, "find", conditions, fields, options); 
  };

  schema.statics.findByIdPromised = function (id, fields, options) {
    return promisify(this, "findById", id, fields, options); 
  };

  schema.statics.findByIdAndRemovePromised = function (id, options) {
    return promisify(this, "findByIdAndRemove", id, options); 
  };

  schema.statics.findByIdAndUpdatePromised = function (id, update, options) {
    return promisify(this, "findByIdAndUpdate", id, update, options); 
  };

  schema.statics.findOnePromised = function (conditions, fields, options) {
    return promisify(this, "findOne", conditions, fields, options); 
  };

  schema.statics.findOneAndRemovePromised = function (conditions, options) {
    return promisify(this, "findOneAndRemove", conditions, options); 
  };

  schema.statics.findOneAndUpdatePromised = function (conditions, update, options) {
    return promisify(this, "findOneAndUpdate", conditions, update, options); 
  };

  schema.statics.mapReducePromised = function (o) {
    return promisify(this, "mapReduce", o); 
  };

  schema.statics.populatePromised = function (docs, options) {
    return promisify(this, "populate", docs, options);
  };

  //NOTE: this is a CLASS method remove.  there is also an instance method
  schema.statics.removePromised = function (conditions) {
    return promisify(this, "remove", conditions); 
  };

  schema.statics.updatePromised = function (conditions, update) {
    return promisify(this, "update", conditions, update); 
  };
};

module.exports = promisifyMongoose;
