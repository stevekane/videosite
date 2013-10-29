var set = Ember.set;

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
    set(this, "error", error.message);
  },

  //handle success w/ Ember
  handleSuccess: function (result) {
    set(this, "disabled", false);
    this.sendAction("action", result.user);
  },

  //handleFailure w/ Ember
  handleFailure: function (error) {
    set(this, "disabled", false);
    set(this, "error", error.message || "Submit unsuccessful");
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
