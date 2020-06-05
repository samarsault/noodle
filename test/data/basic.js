//
// Sets up connection with MongoDB
// and populates some basic data
//
const mongoose = require('mongoose');
const { User, Course } = require('../../models');

module.exports = {
	beforeEach: async () => {
		await User.deleteMany();
		await Course.deleteMany();
		return populateDB();
	},
	beforeAll: async () => {
		mongoose.set('useCreateIndex', true);
		mongoose.connect(global.MONGO_URL, {
			dbName: global.MONGO_DB_NAME,
			useNewUrlParser: true,
		});
	},
	afterAll: async () => {
		mongoose.connection.close();
	},
};

async function populateDB() {
	const student = await User.create({
		name: 'Dummy User',
		email: 'student@bpgc-cte.org',
		oauth_id: '2034102512',
	});

	const instructor = await User.create({
		name: 'Instroctor',
		email: 'instructor@bpgc-cte.org',
		oauth_id: '8823421',
		role: 'instructor',
	});

	const admin = await User.create({
		name: 'Admin',
		email: 'admin@bpgc-cte.org',
		oauth_id: '88234211214',
		role: 'admin',
	});

	const course = await Course.create({
		name: 'Dummy Course',
		summary: new Array(21).join('Dummy.....'),
		description: new Array(58).join('Long Description.'),
		handout: '/something.pdf',
		coverImage: '/something.png',
		offerYear: 2019,
		offerSem: 2,
		// topics: [ 'Introduction', 'Endnotes'],
		instructors: [instructor._id],
	});

	return {
		student,
		admin,
		instructor,
		course,
	};
}
