var attr = DS.attr;

App.User = DS.Model.extend({
  
  username: attr(),
  firstName: attr(),
  lastName: attr(),

  email: "",

  fullName: function () {
    return this.get('firstName') + this.get('lastName'); 
  }.property('firstName', 'lastName')

});
