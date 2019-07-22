//
// Verify the user is authenticated
//

module.exports = function(req, res, next) {
	if (req.isAuthenticated())
		return next();

	return res.status(401).redirect('/');
}
