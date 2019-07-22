const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./models');

module.exports = (passport) => {
	passport.serializeUser(function(user, done) {
		// value of req.passport.user
		done(null, user._id);
	});
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			if(!err) done(null, user);
			else done(err, null);
		});
	});
	passport.use(
		new GoogleStrategy({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/callback'
		},
		function (accessToken, refreshToken, profile, done) {
			User.findOne({ oauth_id: profile.id }, function(err, user) {
				if (err) {
				    console.log(err);  // handle errors!
				}

				if (!err && user !== null) {
					done(null, user);
				} else {
					const email = profile.emails[0].value;

					if (email.split('@')[1] !== 'goa.bits-pilani.ac.in')
						return done(null, false, 'Please Sign In using your BITS Goa Email');

					let user = new User({
						oauth_id: profile.id,
						name: profile.displayName,
						email,
						created: Date.now()
					});
					user.save(function(err) {
						if (err) {
				    	    console.log(err);  // handle errors!
				    	} else {
				    		console.log("Saving user ...");
				    		done(null, user);
				    	}
				    });
				}
			});
		})
	);
};
