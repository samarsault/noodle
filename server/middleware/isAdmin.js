//
// Verify the user is admin
//
module.exports = async function (req, res, next) {
  const { role } = req.user;
  if (role === "admin") return next();

  // Unauthorized
  return res.status(401).send("Unauthorized");
};
