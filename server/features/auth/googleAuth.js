const GoogleStrategy = require("passport-google-oauth20").Strategy;
const authService = require("./auth.service");
// Callback on successful authentication from provider
//
async function oauthCallback(accessToken, refreshToken, profile, done) {
  const email = profile.emails[0].value;

  if (email.split("@")[1] !== "goa.bits-pilani.ac.in")
    return done(null, false, "Please Sign In using your BITS Goa Email");

  try {
    const token = await authService.login({
      email,
      password: profile.id,
    });
    return done(null, token);
  } catch (err) {
    const newUserToken = await authService.createUser({
      name: profile.displayName,
      email,
      password: profile.id,
    });

    // const newUser = await User.create({
    //   oauth_id: profile.id,
    //   name: profile.displayName,
    //   email,
    //   created: Date.now(),
    //   // first user is admin
    //   role: count === 0 ? "admin" : "student",
    // });

    return done(null, newUserToken);
  }
}

module.exports = (passport) => {
  // passport.serializeUser(function (user, done) {
  //   // value of req.passport.user
  //   done(null, user._id);
  // });

  // passport.deserializeUser(function (id, done) {
  //   User.findById(id, function (err, user) {
  //     if (!err) done(null, user);
  //     else done(err, null);
  //   });
  // });

  const Strategy = new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/callback",
    },
    oauthCallback
  );

  passport.use(Strategy);
};
