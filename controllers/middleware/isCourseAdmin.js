//
// Verify the user is admin for the course
//
const { User } = require('../models/');

module.exports = function(req, res, next) {
	const id = req.session.passport.user.id;
	const course_id = req.course_id;
	const { role, instructor_for } = User.find({ _id: id }).select('role instructor_for')
	if (role === 'instructor' && instructor_for === course_id)
		return next()

	// Unauthorized
	return res.staus(401);
}
