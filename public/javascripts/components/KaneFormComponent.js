var set = Ember.set
  , alias = Ember.computed.alias;

function resetFields (hash) {
  Object.keys(hash).forEach(function (key) {
    set(hash, key, ""); 
  });
}

App.KaneFormComponent = Ember.Component.extend({

  tagName: "form",

  disabled: false,

  hash: {
    main: "",
    second: "lol"
  },

  actions: {

    submit: function (hash) {
      console.log("submit has occurred");
      set(this, "disabled", true);
      Ember.run.later(this, function () {
        set(this, "disabled", false); 
      }, 2000);
    },


  }

});
