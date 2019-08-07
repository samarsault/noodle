//
// Super Admin Actions
//
const express = require('express');
const upload = require('./upload');
const response = require('../../util/response');
const { User, Course } = require('../../models');

const router = express.Router();

router.post('/addCourse', upload.fields([{
	name: 'coverImage',
	maxCount: 1
}, {
	name: 'handout',
	maxCount: 1
}]), async function (req, res) {
	if (!req.files || !req.files['coverImage'][0] || !req.files['handout'])
		return res.json(response.error('Insufficent fields'));

	const {
		name,
    summary,
		description,
		offerYear,
		offerSem,
    topics,
    instructors
	} = req.body;
  
  const topicsArr = topics.replace(/\r/g, '').split('\n');
  const instructorsArr = instructors.split(',');

  try {
    // Create Course
  	const course =  await Course.create({
      name,
      summary,
  		description,
  		handout: `/uploads/${req.files['handout'][0].filename}`,
  		coverImage: `/uploads/${req.files['coverImage'][0].filename}`,
  		offerYear,
  		offerSem,
      topics: topicsArr
    });

    // Update instructor & roles
    const updateDelegates = instructorsArr.map(async (email) => {
      const user = await User.findOne({
        email,
			}).select('role');

			// don't degrede admin
			if (user.role !== 'admin') {
				await User.updateOne(
					{
						_id: user._id
					},
					{
        		role: 'instructor',
        		instructor_for: course._id
					}
				)
			}

      await Course.updateOne(
				{
					_id: course._id
				},
				{
      	  $addToSet: {
      	    instructors: user._id
      	  }
      	})
    });

    await Promise.all(updateDelegates);

    return res.json(response.success());

  } catch (e) {

    if (process.env.NODE_ENV !== 'production')
      return res.json(response.error(e.message));

    return res.json(response.error());
  }
});

// TODO: Efficiency
router.get('/users', async function (req, res) {
	const users = await User.find({});
	return res.json(users);
})

router.get('/users/search', async function(req, res) {
  const query = req.query['q'];
  if (!query)
    return res.json([]);
  
  const re = new RegExp(`${query}.*`, 'i')
  re.ignoreCase = true;

  const users = await User.find({
    $or: [
      { name: re },
      { email: re }
    ]
  }).select("name email").limit(10);

	return res.json(users);
})

router.get('/courses/search', async function (req, res) {
  const query = req.query['q'];
  if (!query)
    return res.json([])

  const courses = await Course.find({ $text: { $search: query } }).limit(10);
  const names = courses.map(course => course.name);
  return res.json(names);
})

//
// Upgrade Access Level of User
//
router.post('/users/updateAccess', async function (req, res) {
	const { user_id, role, instructor_for } = req.body;

	if (user_id && role) {

		if (role === 'instructor' && !instructor_for)
			return res.json(response.error('Instructor role requires a course.'))
    
    const user = await User.findOneAndUpdate(
			{ _id: user_id }, 
			{ role }
		);

		// Update role as instructor
		if (instructor_for) {
 			await Course.updateOne(
				{
					name: instructor_for
				},
				{
			    $addToSet: {
 			  		instructors: user._id
 			  	}
				}
			)
		}

		return res.redirect('/dashboard/admin?success=1')
	}

	return res.redirect(
		'/dashboard/admin?success=0'
	);

})

module.exports = router;
