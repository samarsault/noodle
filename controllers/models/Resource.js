const { model, Schema } = require('mongoose');
const { r_string } = require('../util/schemaTypes');

module.exports = model('Resource', new Schema({
	name: r_string,
	description: String,
	topic: r_string,
	course: { 
		type: Schema.Types.ObjectId, 
		ref: 'Course',
		required: true
	},
	url: r_string,
	type: r_string
}), 'resources');
