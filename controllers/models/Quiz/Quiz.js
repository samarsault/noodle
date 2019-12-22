const { model, Schema } = require('mongoose');
const { r_string } = require('../../util/schemaTypes');

module.exports = model('Quiz', new Schema({
	name: r_string,
	course: { 
		type: Schema.Types.ObjectId, 
		ref: 'Course',
		required: true
	},
	questions: [{ 
			question: r_string,
			options: [ String ],
			// index of correct answer/chosen option
			answer: {
				type: Number,
				required: true
			}
	}]
	// type: r_string -> Used to show different icons
}), 'quiz');
