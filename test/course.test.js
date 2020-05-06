//
// Course Service Test
//
const basicData = require('./data/basic');
const courseService = require('../services/course');
const { User } = require('../models');

let data;

beforeAll(async () => {
	data = await basicData.beforeAll();
});

describe('Course Service', function() {
	it('Register a user successfully', async (done) => {
		// Call Function
		await courseService.register(data.student._id, data.course._id);

		// Check the database
		const user = await User.findOne({ _id: data.student._id })
		expect(user.courses).toContainEqual(data.course._id)
		done();
	});

	// TODO:
	// it('Deregisters a user successfully', async (done) => {
	// 	done();
	// });

	// it('Renders course view appropriately', async (done) => {
	// 	done();
	// })
});
afterAll(basicData.afterAll);
