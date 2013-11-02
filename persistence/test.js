var Q = require('q')
  , uuid = require('node-uuid')
  , _ = require('lodash')
  , testStore = {};

//READ
var find = function (type, hash) {
  var findPromise = Q.defer();

  var model = hash ? _.clone(hash) : {};
  model.id = uuid.v1();
  model.type = type;
  findPromise.resolve([model]);

  return findPromise.promise;
}

var findOne = function (type, hash) {
  var findPromise = Q.defer();

  var model = _.clone(hash);
  model.type = type;
  findPromise.resolve(model);

  return findPromise.promise;
}

var findById = function (type, id) {
  var findPromise = Q.defer();

  findPromise.resolve({id: id, type: type});

  return findPromise.promise;
}

//CREATE
var create = function (type, hash) {
  var createPromise = Q.defer();

  var model = _.clone(hash);
  model.id = uuid.v1();
  model.type = type;
  createPromise.resolve(model);

  return createPromise.promise;
}

//UPDATE
var updateById = function (type, id, hash) {
  var updatePromise = Q.defer();

  var model = _.clone(findById(type, id)); 
  updatePromise.resolve(_.assign(model, hash));

  return updatePromise.promise;
}

//DELETE
var removeById = function (type, id) {
  var removePromise = Q.defer();
  
  removePromise.resolve(null);

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
