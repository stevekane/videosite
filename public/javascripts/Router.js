require('routes/Application.js');
require('routes/Videos.js');

App.Router.map(function () {
  this.resource('signup');
  this.resource('login');
  this.resource('account', function () {
    this.route('changeEmail');
    this.route('changePassword');
    this.route('subscribe');
  });
  this.resource('videos', {path: "/videos"});
  this.resource('video', {path: "/video/:video_id"});
});
