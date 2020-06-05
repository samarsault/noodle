module.exports = {
	error(message) {
		return {
			success: false,
			message,
		};
	},
	success(message) {
		return {
			success: true,
			message,
		};
	},
};
