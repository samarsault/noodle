//
// Connect to database
//
const mongoose = require('mongoose');

module.exports = async function () {
	const dbURL = 'mongodb://localhost:27017/cte-test';
	mongoose.set('useCreateIndex', true);
	try {
		await mongoose.connect(dbURL, { useNewUrlParser: true });
	} catch (err) {
		console.log('Can\'t connect to database.')
	}
}
