module.exports = {
  formatWithKey: formatWithKey,
  format: format
}

//accepts either Mongo Object or POJO
function formatWithKey (keyName, hash) {
  var objectWithKey = {};
  objectWithKey[keyName] = format(hash);
  return objectWithKey;
}

//accepts either Mongo Object or POJO
function format (hash) {
  var formatted = hash.toObject ? hash.toObject() : _.clone(hash, true);
  formatted.id = formatted._id;
  delete formatted.__v;
  delete formatted._id;
  return formatted;
}
