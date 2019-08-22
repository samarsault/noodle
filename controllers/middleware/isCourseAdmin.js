//
// Verify the user is admin for the course
//
const { Course } = require('../models/');

module.exports = async function(req, res, next) {
	const user_id = req.user._id;
	const course_id = req.course_id;

	// Allow admin to pass
	if (req.role === 'admin')
		return next();

	const count = await Course.countDocuments({ _id: course_id, instructors: user_id }).limit(1);

	if (count > 0)
		return next();

	// Unauthorized
	return res.status(401).send('Unauthorized');
}
