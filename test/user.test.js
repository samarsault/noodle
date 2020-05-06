//
// Course Service Test
//
const basicData = require('./data/basic');
const userService = require('../services/user');
const courseService = require('../services/course');
const { User } = require('../models');

let data;

beforeAll(async () => {
	data = await basicData.beforeAll();
	await courseService.register(data.student._id, data.course._id);
});

describe('User Service', function() {
	it('Shows registered course in dashboard', async (done) => {
		const dashboard = await userService.getDashboard(data.student._id);
	
		// TODO: Match Course ID
		expect(dashboard.courses).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: data.course.name,
					instructors: expect.arrayContaining([data.instructor.name])
				})
			])
		)
		done();
	});

});


afterAll(basicData.afterAll);
