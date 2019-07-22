//
// Verify the user is admin
//
const { User } = require('../models/');

module.exports = function(req, res, next) {
	const id = req.session.passport.user;
	const { role } = User.find({ _id: id }).select('role')
	if (role === 'admin')
		return next()

	// Unauthorized
	return res.status(401).send('Unauthorized');
}
