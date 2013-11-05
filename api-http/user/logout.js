/*
We are using passport and therefore we just call req.logout()
*/
module.exports = function (req, res) {
  req.logout();
  return res.send(200, {message: "Logged out"});
}
