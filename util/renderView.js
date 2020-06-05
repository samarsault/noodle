/*
 * Helper function to render views with
 * common attribtes
 */
module.exports = (req, res, name, params) => {
	const data = {
		signedIn: req.isAuthenticated(),
		...(params || {}),
	};

	return res.render(name, data);
};
