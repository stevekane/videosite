var set = Ember.set;

var setForDuration = _.curry(function (key, value, duration, context) {
  set(context, key, value);
  Ember.run.later(context, function () {
    set(context, key, ""); 
  }, duration);
});

var resetFields = _.curry(function (fieldNames, hash) {
  _.each(fieldNames, function (fieldName) {
    set(hash, fieldName, "");
  });

  return hash;
});

App.KaneBaseFormComponent = Ember.Component.extend({

  hash: {},

  url: "",

  fieldValidations: [],

  formValidations: [],

  validate: Forms.validate,

  submit: function (url, hash) {
    return Ember.$.post(url, hash); 
  },

  //handleErrors w/ Ember
  handleInvalid: function (error) {
    set(this, "disabled", false);
    setForDuration("error", error.message, 5000, this);
  },

  //handle success w/ Ember
  handleSuccess: function (result) {
    set(this, "disabled", false);
    this.sendAction("action", result);
  },

  //handleFailure w/ Ember
  handleFailure: function (error) {
    var message = error.message || "Submit unsuccessful";

    set(this, "disabled", false);
    setForDuration("error", message, 5000, this);
  },

  actions: {
    
    submit: function (hash) {
      var self = this
        , fieldValidations = this.get('fieldValidations')
        , formValidations = this.get('formValidations')
        , url = this.get('url');

      set(this, "disabled", true); 
      try {
        this.validate(fieldValidations, formValidations, hash); 
      } catch (error) {
        return this.handleInvalid(error);  
      }
      this.submit(url, hash)
      .then(function (result) {self.handleSuccess.call(self, result);})
      .fail(function (error) {self.handleFailure.call(self, error);})
    }
  }
});
