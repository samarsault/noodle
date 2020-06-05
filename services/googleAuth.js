const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

//
// Callback on successful authentication from provider
//
async function oauthCallback(accessToken, refreshToken, profile, done) {
	const user = await User.findOne({ oauth_id: profile.id });

	if (user !== null) {
		done(null, user);
	} else {
		const email = profile.emails[0].value;
		const count = await User.countDocuments({});

		if (email.split('@')[1] !== 'goa.bits-pilani.ac.in')
			return done(null, false, 'Please Sign In using your BITS Goa Email');

		const newUser = await User.create({
			oauth_id: profile.id,
			name: profile.displayName,
			email,
			created: Date.now(),
			// first user is admin
			role: count == 0 ? 'admin' : 'student',
		});

		done(null, newUser);
	}
}

module.exports = (passport) => {
	passport.serializeUser(function (user, done) {
		// value of req.passport.user
		done(null, user._id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			if (!err) done(null, user);
			else done(err, null);
		});
	});

	const Strategy = new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/callback',
		},
		oauthCallback
	);

	passport.use(Strategy);
};
