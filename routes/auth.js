const express = require('express');

const router = express.Router();
const passport = require('passport');
const userController = require('../services/user');

router.get(
	'/',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
	})
);

router.get(
	'/callback',
	passport.authenticate('google', {
		failureRedirect: '/loginError',
	}),
	(req, res) => {
		res.redirect(req.session.returnTo || '/dashboard');
		delete req.session.returnTo;
	}
);

// Update user with BITS ID, Phone Number
router.post('/update', async (req, res) => {
	const user_id = req.session.passport.user;
	// const { bits_id, phone }  =  req.body;
	await userController.updateInfo(user_id, req.body);

	res.redirect(req.session.returnTo || '/dashboard');
	delete req.session.returnTo;
});

router.get('/logout', (req, res) => {
	req.logout();
	req.session = null;
	res.redirect('/');
});

module.exports = router;
