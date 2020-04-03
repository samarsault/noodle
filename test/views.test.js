//
// Test server side views
//

const app = require('../app')
const mongoose = require('mongoose')
const server = require('supertest').agent(app)

const createDummyCourse = require('./data/createDummyCourse')
let data;

beforeAll(async () => {
	data = await createDummyCourse();
})

describe('Test Server Side Views', () => {
	it('Course list renders correctly', async (done) => {
		const resp = await server.get('/courses');	
		expect(resp.statusCode).toBe(200);
		expect(resp.type).toBe('text/html');

		// Course rendered correctly
		expect(resp.text).toContain(`${data.course._id}/view`);
		expect(resp.text).toContain(data.course.name);
		expect(resp.text).toContain(data.course.coverImage);

		done();
	})

	it('Course View renders correctly', async (done) => {
		const resp = await server.get(`/courses/${data.course._id}/view`);	
		expect(resp.statusCode).toBe(200);
		expect(resp.type).toBe('text/html');

		// Course rendered
		expect(resp.text).toContain(`${data.course._id}/register`);
		expect(resp.text).toContain(data.course.name);
		expect(resp.text).toContain(data.course.coverImage);

		done();
	})

	it('Renders static pages appropriately', async (done) => {
		const urls = [ '/', '/agreement', '/terms', '/team', '/loginError', '/faq'];
		const responses = await Promise.all(urls.map(url => server.get(url)))
		responses.forEach((response, index) => {
			expect(response.statusCode).toBe(200);
			expect(response.type).toBe('text/html');
		})
		done();
	})
	
})


afterAll(async () => {
	await data.destroyAll();
	await mongoose.connection.close()
})
