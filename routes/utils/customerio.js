var cioRegister = _.curry(function (cio, user) {
  cio.identify(user._id, user.email, {created_at: user.created_at});
  return user;
});

var cioTrackNewAccount = _.curry(function (cio, user) {
  cio.track(user.id, 'account_created', {
    subscription_level: 'new_account'
  });
  return user;
});

var cioTrackEmailChange = _.curry(function (cio, user) {
  cio.track(user.id, 'email_changed')
  return user;
});

var cioUpdateUser = _.curry(function (cio, user) {
  user.updated_at_timestamp("Edit Email");
  cio.identify(user._id, user.email, {
    updated_at: user.updated_at,
    last_action: user.last_modified_action
  });
  return user;
});

var cioTrackPasswordReset = _.curry(function (cio, user) {
  cio.track(user.id, 'account_modification', {
    account_action: 'request_pw_change'
  });
  return user;
});

var cioTrackPasswordChange = _.curry(function (cio, newPassword, user){
  cio.track(user.id, 'account_modification', {
    account_action: 'pw_change_complete',
    temp_password: newPassword
  });
});
