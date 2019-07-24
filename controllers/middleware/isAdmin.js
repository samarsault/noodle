//
// Verify the user is admin
//
const { User } = require('../models/');

module.exports = async function(req, res, next) {
	const id = req.session.passport.user;
	const { role } = await User.findOne({ _id: id }).select('role')
	if (role === 'admin')
		return next()

	// Unauthorized
	return res.status(401).send('Unauthorized');
}
