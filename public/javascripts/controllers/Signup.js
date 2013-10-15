App.SignupController = Ember.Controller.extend({
  username: null,
  password: null,
  confirmPassword: null,
  email: null,
  actions:{
    createNewAccount: function(){
      user = this.get('username');
      password = this.get('password');
      passwordConfirm = this.get('confirmPassword');
      email = this.get('email');
      _this = this;
      
      $.ajax({
        type: 'POST',
        url: "http://localhost:3000/user/create",
        data: {username:user, password: password, email: email},
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