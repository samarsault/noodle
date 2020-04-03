//
// This helper can be used to perform
// authenticated requests
//
module.exports = function(server, withInfo) {
	return async (done) => {
		const res = await server.get('/auth/callback');
		expect(res.statusCode).toBe(302);
		expect(res.headers.location).toBe('/dashboard');
		// Full User
		if (withInfo) {
			const updateResponse = await server.post('/auth/update').send({
				bits_id: '2018A8PS0414G',
				phone: '9911223344'
			})

			expect(updateResponse.statusCode).toBe(302);
		}
		return done();
	}
}
