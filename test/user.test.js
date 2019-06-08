const { expect } = require('chai');
const mongoose = require('mongoose');
const { User } = require('../controllers/models');

describe('User', function() {

	before(function(done) {
		mongoose.connect('mongodb://localhost:27017/cte-dev', { useNewUrlParser: true });
		done();
	});

	after(function(done) {
		mongoose.connection.close();
		done();
	});

	beforeEach(function(done) {

		var user = new User({
			oauth_id: 12345,
			name: 'Test',
			email: 'test@bpgc-cte.org',
			created: Date.now()
		});

		user.save(function(error) {
			if (error)
				console.log('error' + error.message);
			done();
		});

	});

	afterEach(function(done) {
		User.deleteMany({}, function() {
			done();
		});
	});

	it('find a user by email', function(done) {
		User.findOne({ email: 'test@bpgc-cte.org' }, function(err, user) {
			expect(user.email).to.equal('test@bpgc-cte.org');
			done();
		});
	});

});
