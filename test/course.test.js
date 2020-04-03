//
// Test course features
//

const app = require('../app')
const server = require('supertest').agent(app)
const mongoose = require('mongoose')

const { User, Course, Resource } = require('../controllers/models')
const dummyCourse = require('./data/createDummyCourse');
const loginUser = require('./util/loginUser')

let data = { }

beforeAll( async () =>{
	// Cleanup
	await User.deleteMany()

	data = await dummyCourse();

	const resource = await Resource.create({
		name: 'Test',
		topic: 'Introduction',
		course: data.course._id,
		url: '/res.pdf'
	})

	data.resource = resource
})

describe('Registration', function() {
	it ('Login User', loginUser(server, true));

	it('Does not register a user without agreement', async (done) => {
		const response = await server.post(`/courses/${data.course._id}/register`)
		expect(response.statusCode).toBe(401)
		done();
	})

	it('Unregistered user can\'t access resources', async (done) => {
		const response = await server.post(`/courses/${data.course._id}/register`)
		expect(response.statusCode).toBe(401)
		done();
	})

	it ('Registers a user', async (done) => {
		const course = data.course;
		const response = await server.post(`/courses/${course._id}/register`).send({
			agreement: 'yes'
		})

		expect(response.statusCode).toBe(302);
		expect(response.headers.location).toBe('/dashboard')

		// Check the database
		const user = await User.findOne({ role: 'student' })
		expect(user.courses).toContainEqual(course._id)

		done();
	})

	it('Shows registered course in dashboard', async (done) => {
		const res = await server.get('/api/dashboard')
	
		// TODO: Match Course ID
		expect(res.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: data.course.name,
					instructors: expect.arrayContaining([data.instructor.name])
				})
			])
		)
		done();
	})

	// it('Can view registered course contents', async (done) => {
	// 	const res = await server.get(`/api/courses/${data.course._id}/view`);
	// 	console.log(res.body);
	// 	done();
	// })

	it('Can access resources', async (done) => {
		const res = await server.get(`/api/courses/${data.course._id}/resources`);
		expect(res.body.Introduction).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: data.resource.name,
					url: data.resource.url
				})
			])
		)
		done();
	})
})



afterAll( async () =>{
	// Cleanup
	await User.deleteMany();
	await Course.deleteMany();
	await mongoose.connection.close()
})
