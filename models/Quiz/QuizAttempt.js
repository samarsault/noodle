const { model, Schema } = require('mongoose');
const { r_string } = require('../../util/schemaTypes');

module.exports = model(
	'QuizAttempt',
	new Schema({
		quiz_id: {
			type: Schema.Types.ObjectId,
			ref: 'Quiz',
			required: true,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		answers: [Number],
		score: Number,
		// type: r_string -> Used to show different icons
	}),
	'quizAttempts'
);
