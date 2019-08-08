//
// Verify the user is authenticated
//
const { User } = require('../models');

module.exports = async function(req, res, next) {
	if (req.isAuthenticated()) {

		if (req.originalUrl.match('/api/user'))
			return next();

		const user = await User.findOne({
			_id : req.session.passport.user
		}).select('email role bits_id phone');

		req.user = user;
		// check if bits id & phone or 
		if (!user.bits_id || !user.phone) {
			res.status(401).json({
				error: 'BITS ID/Phone not found',
				location: '/dashboard/signup'
			});
		}
		return next();
	}

	// TODO: Register on auth
	if (req.originalUrl.match('/api')) {
		return res.status(401).json({
			error: 'Not authorized',
			location: '/auth'
		})
	}

	// redirect to page user was on after login
	req.session.returnTo = req.originalUrl;

	return res.status(401).redirect('/auth');
}
