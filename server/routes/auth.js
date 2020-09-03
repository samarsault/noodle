const express = require("express");

const router = express.Router();
const passport = require("passport");

const { postLogin, postSignUp } = require("../features/auth/auth.controller");

router.post("/login", postLogin);
router.post("/signup", postSignUp);

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/loginError`,
    session: false,
  }),
  (req, res) => {
    const token = req.user;
    // TODO:
    // Shouldn't pass auth tokens in URL
    // Use iframe/script instead (involves complications with different origin)
    return res.redirect(`${process.env.CLIENT_URL}/authorized?token=${token}`);
  }
);

module.exports = router;
