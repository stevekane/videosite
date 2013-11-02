var Q = require('q')
  , _ = require('lodash')
  , User = require('./mongo/user').User;

//Sanitize the model provided by mongoose for return
var formatModel = function (data) {

  if (!data) { return null; }

  var model = _.clone(data.toObject ? data.toObject() : data);
  model.id = data._id;
  delete model.__v;
  delete model._id;

  return model;
}

//CREATE
module.exports.create = function (data) {
  var createPromise = Q.defer();
  
  User.createPromised(data)
  .then(function (user) {
    createPromise.resolve(formatModel(user));
  })
  .fail(function (err) {
    createPromise.reject(err); 
  })

  return createPromise.promise;
}

//READ
module.exports.count = function (hash) {
  return User.countPromised(hash); 
}

module.exports.findById = function (id) {
  var findPromise = Q.defer();

  User.findByIdPromised(id)
  .then(function (user) {
    findPromise.resolve(formatModel(user)); 
  })
  .fail(function (err) {
    findPromise.reject(err); 
  })

  return findPromise.promise;
}

module.exports.findMany = function (conditions) {
  var findPromise = Q.defer();

  User.findPromised(conditions)
  .then(function (user) {
    findPromise.resolve(formatModel(user)); 
  })
  .fail(function (err) {
    findPromise.reject(err); 
  })

  return findPromise.promise;
}

module.exports.findOne = function (conditions) {
  var findPromise = Q.defer();

  User.findOnePromised(conditions)
  .then(function (user) {
    findPromise.resolve(formatModel(user)); 
  })
  .fail(function (err) {
    findPromise.reject(err); 
  })

  return findPromise.promise;
}

//UPDATE
/*
We use find, update, and save in order to get our pre save
hooks to fire (includes some nifty shit like timestamping and 
encryption
*/
module.exports.updateById = function (id, hash) {
  var updatePromise = Q.defer();

  if (!id) {
    throw new Error("No id provided");
  }

  User.findByIdPromised(id)
  .then(function (user) {
    //here we assign the k/v pairs to the retrieved model
    _.assign(user, hash);
    return user.savePromised();
  })
  .then(function (user) {
    console.log('post save', user);
    return updatePromise.resolve(formatModel(user));  
  })
  .fail(function (err) {
    updatePromise.reject(err); 
  })

  return updatePromise.promise;
}

//DELETE
module.exports.remove = function (hash) {
  var removePromise = Q.defer();

  User.removePromised(hash)
  .then(function (user) {
    removePromise.resolve(formatModel(user));
  })
  .fail(function (err) {
    removePromise.reject(err);
  })

  return removePromise.promise;
}

//COMBINED?
module.exports.findByIdAndRemove = function (id) {
  var removePromise = Q.defer();

  User.findByIdAndRemovePromised(id)
  .then(function (user) {
    removePromise.resolve(formatModel(user));
  })
  .fail(function (err) {
    removePromise.reject(err);
  })

  return removePromise.promise;
}

//NOTE, hash is treated as "set" operators per mongoose
module.exports.findByIdAndUpdate = function (id, hash) {
  var updatePromise = Q.defer();

  User.findByIdAndUpdatePromised(id, hash)
  .then(function (user) {
    updatePromise.resolve(formatModel(user));
  })
  .fail(function (err) {
    updatePromise.reject(err);
  })

  return updatePromise.promise;
}

module.exports.findOneAndUpdate = function (conditions, hash) {
  var updatePromise = Q.defer();

  User.findOneAndUpdatePromised(conditions, hash)
  .then(function (user) {
    updatePromise.resolve(formatModel(user));
  })
  .fail(function (err) {
    updatePromise.reject(err);
  })

  return updatePromise.promise;
}

module.exports.findOneAndRemove = function (conditions) {
  var removePromise = Q.defer();

  User.findOneAndRemove(conditions)
  .then(function (user) {
    removePromise.resolve(formatModel(user));
  })
  .fail(function (err) {
    removePromise.reject(err);
  })

  return removePromise.promise;
}
