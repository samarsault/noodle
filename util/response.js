module.exports = {
	error: function(message) {
		return {
			success: false,
			message
		}	
	},
	success: function(message) {
		return {
			success: true,
			message
		}
	}
}
