var _ = require('lodash')
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

/*
TODO: As indicated below, this currently uses hashSync which 
is terrible and should be changed to use promises via 
bcrypt-promises and Q.all (or rsvp.hash)
*/
module.exports = function (schema, options) {

  /*
  I want to grab all the keys off the model that are listed
  I want to hash them all and then assign the hashed values
  back to the object by keyName
  finally, call next()
  */
  schema.pre("save", function (next) {
    var user = this
      , keys = options.keys || []
      , hashObject = _.pick(user, keys);
    
    if (0 === keys.length) {
      return next();
    }

    //check if any of the provided fields were modified
    if (!_.any(keys, user.isModified)) {
      return next(); 
    }

    //TODO: this is sync atm because I cannot fucking figure out
    //how to loop over the keys properly...fuck
    _.each(keys, function (key) {
      user[key] = bcrypt.hashSync(user[key], SALT_WORK_FACTOR);
    });

    return next();
  });
}
