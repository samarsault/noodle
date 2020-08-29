const express = require("express");

const router = express.Router();
const passport = require("passport");
const { user: userService } = require("../features/services");

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
    failureRedirect: "/auth/failure",
    session: false,
  }),
  (req, res) => {
    const token = req.user;
    // TODO:
    // Shouldn't pass auth tokens in URL
    // Use iframe/script instead (involves complications with different origin)
    const { CLIENT_URL } = process.env;
    return res.redirect(`${CLIENT_URL}/authorized?token=${token}`);
  }
);

// Update user with BITS ID, Phone Number
router.post("/update", async (req, res) => {
  const user_id = req.session.passport.user;
  // const { bits_id, phone }  =  req.body;
  await userService.updateInfo(user_id, req.body);
  return res.json({
    success: true,
  });
});

module.exports = router;
