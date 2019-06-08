const { model, Schema } = require('mongoose');
const { r_string, r_num } = require('../util/schemaTypes');

module.exports = model('Course', new Schema({
	name: r_string,
	description: r_string,
	handout: r_string,
	coverImage: r_string,
	offerYear: r_num,
	offerSem: r_num,
	topics: [
		{ type: String }
	],
	instructors: [
		{ type: Schema.Types.ObjectId, ref: 'User' }
	]
}), 'courses');
