//
// Verify the user is admin for the course
//
const { Course } = require('../models/');

module.exports = async function(req, res, next) {
	const user_id = req.session.passport.user.id;
	const course_id = req.course_id;

	const { instructors } = await Course.countDocuments({ _id: course_id, instructors: user_id }).limit(1);

	if (instructors > 0)
		return next();

	// Unauthorized
	return res.staus(401);
}
