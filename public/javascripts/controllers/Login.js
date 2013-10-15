App.LoginController = Ember.Controller.extend({
  username: null,
  password: null,
  actions:{
    updateAccountInfo: function(){
      user = this.get('username');
      password = this.get('password');
      _this = this;
      $.ajax({
        type: 'POST',
        url: "http://localhost:3000/user/login",
        data: {username:user, password: password},
        success: function(response){
          console.log("OK!", response);
        },
        error: function(response){
          console.log(response);
        },
        complete: function(res){
          _this.setProperties({username: null, password: null});
        }
      });
    }
  }
});