//
// Admin API
//
const express = require('express');
const courseAdminRouter = require('./course');
const superAdminRouter = require('./super');

// Middleware
const isAdmin = require('../../middleware/isAdmin');
const isCourseAdmin = require('../../middleware/isCourseAdmin');

const router = express.Router();

// course admin
router.use('/courses/:course_id', (req, res, next) => {
	// assign route param
	req.course_id = req.params.course_id;
	return next();
	
}, isCourseAdmin, courseAdminRouter);

// super admin
router.use('/super', isAdmin, superAdminRouter);

module.exports = router;
