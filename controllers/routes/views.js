//
// Server rendered pages
//
const express = require('express');
const router = express.Router();
const faq = require('../../faq');

const renderView = require('../util/renderView');
const { User, Course } = require('../models');

//Current Date Calculation
const calcDate  = require('../util/calcDate')

async function renderCourses(req, res, period) {
	const courses = await Course.find({ 
		offerYear: period[0],
		offerSem: period[1]
	});

	renderView(req, res, 'catalog', { 
		courses
	})
}
// Home Page
router.get('/', function(req, res, next) {
	return renderView(req, res, 'index', { title: 'CTE' })
});

// Team
router.get('/team', function(req, res) {
	return renderView(req, res, 'team');
});

// FAQ
router.get('/faq', function(req, res) {
	const topics = Object.keys(faq);
	return renderView(req, res, 'faq', { faq, topics });
})

// Courses Page
router.get('/courses', async function(req, res) {
	const current = calcDate(Date.now());
	await renderCourses(req, res, current);	
})

router.get('/terms', function (req, res) {
	return renderView(req, res, 'agreement', { hideAgreement: true });
})

// Course Page
router.get('/courses/:course_id/view', async function (req, res, next) {
  const course = await Course.findOne({ _id: req.params.course_id });

  const instructorDelegates = course.instructors.map(async user_id => {
    const user = await User.findOne({ _id: user_id }).select('name');
    return user.name;
  });

  const instructors = await Promise.all(instructorDelegates);
  const courseObject = course.toObject();
  courseObject.instructors = instructors;
  const curDate = calcDate(Date.now());
  const isArchive = (courseObject.offerYear < curDate[0] || (course.offerYear===curDate[0] && courseObject.offerSem===1));
	renderView(
		req,
		res,
		'course',
		{ course: courseObject ,
		isArchive: isArchive
		}
	)

});

// Archives
router.get('/archives', function(req, res) {
	const start = [2019, 1];
	const end = calcDate(Date.now());
	const periods = []
	const years = end[0] - start[0]
	for (let i = 0;i <= years;i++) {
		const period1 = [ start[0] + i, 1 ];
		const period2 = [ start[0] + i, 2 ];
		periods.push({ 
			stamp: `${period1[0]}-${period1[1]}`,
			link: `/archives/${period1[0]}/${period1[1]}`
		})
		if (!(period1[0] === end[0]  && end[1] == 1)) {
			periods.push({ 
				stamp: `${period2[0]}-${period2[1]}`,
				link: `/archives/${period2[0]}/${period2[1]}`
			})
		}
	}
	// remove end
	periods.pop()
	renderView(req, res, 'archives', { 
		periods
	})
})


router.get('/archives/:year/:sem', async function(req, res) {
	const year = parseInt(req.params.year);
	const sem = parseInt(req.params.sem);

	if (!isNaN(year) && !isNaN(sem)) {
		const period = [ year, sem ];
		await renderCourses(req, res, period)
	}
});

router.get('/loginError', function (req, res) {
	return renderView(req, res, 'error', {
		title: 'Error Signing you Up',
		message: 'Please ensure you are using your BITS Mail to Sign Up'
	})
})

module.exports = router;
