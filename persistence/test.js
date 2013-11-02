var uuid = require('node-uuid')
  , _ = require('lodash')
  , testStore = {};

//READ
var find = function (type, hash) {
  var model = _.clone(hash);
  model.id = uuid.v1();
  model.type = type;
  return [model];
}

var findOne = function (type, hash) {
  var model = _.clone(hash);
  model.type = type;
  return model;
}

var findById = function (type, id) {
  return {
    id: id,
    type: type
  }
}

//CREATE
var create = function (type, hash) {
  var model = _.clone(hash);
  model.id = uuid.v1();
  model.type = type;
  return model;
}

//UPDATE
var updateById = function (type, id, hash) {
  var model = _.clone(findById(type, id)); 
  return _.assign(model, hash);
}

//DELETE
var removeById = function (type, id) {
  return null;
}

module.exports = {
  find: find,
  findOne: findOne,
  findById: findById,
  create: create,
  updateById: updateById,
  removeById: removeById
}
