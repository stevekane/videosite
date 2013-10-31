function logout (req, res) {
  req.logout();
  res.status(200).send("logged out successfully");
}

module.exports = logout;
