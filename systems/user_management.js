var Q = require('q')
  , _ = require('lodash')
  , User = require('data_models').User;

//Sanitize the model provided by mongoose for return
var formatUser = function (data) {
  var user = _.clone(data);
  user.id = data._id;
  delete user.password;
  delete user.temporary_password;
  delete user.__v;
  delete user._id;
  console.log('cleaned user is', user);
  return user;
}

//CREATE
module.exports.create = function (data) {
  var createPromise = Q.defer();
  
  User.createPromised(data)
  .then(function (user) {
    createPromise.resolve(formatUser(user));
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
    findPromise.resolve(formatUser(user)); 
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
    findPromise.resolve(formatUser(user)); 
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
    findPromise.resolve(formatUser(user)); 
  })
  .fail(function (err) {
    findPromise.reject(err); 
  })

  return findPromise.promise;
}

//UPDATE
module.exports.save = function (hash) {
  var savePromise = Q.defer();

  if (!hash.id) {
    throw new Error("No id provided in hash" + hash);
  }

  //findById, then save, then return saved user
  User.findByIdPromised(id)
  .then(function (user) {
    return user.savePromised(); 
  })
  .then(function (user) {
    savePromise.resolve(formatUser(user));
  })
  .fail(function (err) {
    savePromise.reject(err);
  })

  return savePromise.promise;
}

module.exports.remove = function (hash) {
  var removePromise = Q.defer();

  User.removePromised(hash)
  .then(function (user) {
    removePromise.resolve(formatUser(user));
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
    removePromise.resolve(formatUser(user));
  })
  .fail(function (err) {
    removePromise.reject(err);
  })

  return removePromise.promise;
}

//NOTE, hash is treated as "set" operators per mongoose
module.exports.findByIdAndUpdate = function (id, hash) {
  var updatePromise = Q.defer();

  User.findByIdAndUpdatePromised(id, hash);
  .then(function (user) {
    updatePromise.resolve(formatUser(user));
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
    updatePromise.resolve(formatUser(user));
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
    removePromise.resolve(formatUser(user));
  })
  .fail(function (err) {
    removePromise.reject(err);
  })

  return removePromise.promise;
}
