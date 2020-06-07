module.exports = {
	publicPath: '/dashboard',
	devServer: {
		proxy: 'http://localhost:3000',
	},
};
