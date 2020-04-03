//
// Test Auth related endpoints
//
const app = require('../app')
const server = require('supertest').agent(app)
const mongoose = require('mongoose')

const { User } = require('../controllers/models')
const loginUser = require('./util/loginUser')

beforeAll(async () => {
	await User.deleteMany();
});

describe('API Access', function() {
	it('Does not allow an unauthenticated user ', async (done) => {
		const res = await server.get('/api/dashboard');
		expect(res.statusCode).toBe(401)
		done();
	})

	it ('Login User', loginUser(server));

	it('Should not allow user without BITS ID and Phone', async (done) => {
		const res = await server.get('/api/dashboard')
		expect(res.statusCode).toBe(302)
		expect(res.body.location).toBe('/dashboard/signup')
		// Add BITS ID & Phone
		// await User.findOne()
		done();
	})

	// TODO: check for wrong bits id input

	it('Updates BITS ID and Phone', async (done) => {
		const bits_id = '2018A8PS0414G';
		const phone = '9911223344'

		const res = await server.post('/auth/update').send({
			bits_id,
			phone
		})

		// Redirected appropriately
		expect(res.headers.location).toBe('/dashboard')
		expect(res.statusCode).toBe(302)

		// There's only one user, hence no condition required
		const user = await User.findOne({ })
		expect(user.bits_id).toBe(bits_id)
		expect(user.phone).toBe(phone);

		done();
	})
})

afterAll( async () =>{
	// Cleanup
	await User.deleteMany()
	await mongoose.connection.close()
})
