const { User, Course } = require('../../controllers/models')

module.exports = async function() {
	const instructor = await User.create({
		name: 'Instroctor',
		email: 'thelehhman@gmail.com',
		oauth_id: '8823421',
		role: 'instructor'
	});
	
	const course = await Course.create({
		name: 'Dummy Course',
		summary: new Array(21).join('Dummy.....'),
		description: new Array(58).join('Long Description.'),
		handout: '/something.pdf',
		coverImage: '/something.png',
		offerYear: 2019,
		offerSem: 2,
		topics: [ 'Introduction', 'Endnotes'],
		instructors: [ instructor._id ]
	})
	
	return {
		instructor,
		course,
		destroyAll: async () => {
			await User.deleteMany();
			await Course.deleteMany();
		}
	}
}
