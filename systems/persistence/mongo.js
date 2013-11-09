var Q = require('q')
  , _ = require('lodash')
  , mongoose = require('mongoose')
  , url = require('../../config/config.json').mongo.url
  //, url = require('../../config/config.json').mongo.mongohq
  , User = require('./mongo/User')
  , Subscription = require('./mongo/Subscription');

mongoose.connect(url, function (err) {
  if (err) { 
    console.log(err); 
  }
  else {
    console.log('mongo connected !');
  }
})

//Sanitize the model provided by mongoose for return
var formatModel = function (data) {

  if (!data) {
    return null;
  }

  var model = _.clone(data.toObject ? data.toObject() : data);
  model.id = data._id;
  delete model.__v;
  delete model._id;

  return model;
}

var formatModels = function (array) {
  return _.map(array, formatModel);
}

var getType = function (type) {
  types = {
    user: User, 
    subscription: Subscription
  }

  if (!types[type]) {
    throw new Error("Invalid type " + type); 
  }
  
  return types[type];
}

//READ
var find = function (type, hash) {
  var findPromise = Q.defer();

  getType(type)
  .findPromised(hash)
  .then(formatModels)
  .then(findPromise.resolve)
  .fail(findPromise.reject);

  return findPromise.promise;
}

var findById = function (type, id) {
  var findPromise = Q.defer();

  if (!id) {
    throw new Error("No id provided");
  }

  getType(type)
  .findByIdPromised(id)
  .then(formatModel)
  .then(findPromise.resolve)
  .fail(findPromise.reject);

  return findPromise.promise;
}

var findOne = function (type, hash) {
  var findPromise = Q.defer();

  getType(type)
  .findOnePromised(hash)
  .then(formatModel)
  .then(findPromise.resolve)
  .fail(findPromise.reject);

  return findPromise.promise;
}

//CREATE
var create = function (type, hash) {
  var createPromise = Q.defer();
  
  getType(type)
  .createPromised(hash)
  .then(formatModel)
  .then(createPromise.resolve)
  .fail(createPromise.reject);

  return createPromise.promise;
}

var confirmFoundModel = function (model) {
  if (!model) {
    throw new Error("No model found!"); 
  }
  return model;
}

//helpers
var updateProperties = _.curry(function (hash, object) {
  return _.assign(object, hash);
});

//UPDATE
/*
We use find, update, and save in order to get our pre save
hooks to fire (includes some nifty shit like timestamping and 
encryption
*/
var updateById = function (type, id, hash) {
  var updatePromise = Q.defer();

  if (!id) {
    throw new Error("No id provided");
  }

  getType(type)
  .findByIdPromised(id)
  .then(confirmFoundModel)
  .then(updateProperties(hash))
  .then(function (model) {
    return model.savePromised();
  })
  .then(formatModel)
  .then(updatePromise.resolve)
  .fail(updatePromise.reject);

  return updatePromise.promise;
}

//DELETE
var removeById = function (type, id) {
  var removePromise = Q.defer();

  if (!id) {
    throw new Error("No id provided");
  }

  getType(type)
  .findByIdPromised(id)
  .then(confirmFoundModel)
  .then(function (model) {
    return model.removePromised();
  })
  .then(formatModel)
  .then(removePromise.resolve)
  .fail(removePromise.reject);

  return removePromise.promise;
}

module.exports = {
  find: find,
  findOne: findOne,
  findById: findById,
  create: create,
  updateById: updateById,
  removeById: removeById
}
