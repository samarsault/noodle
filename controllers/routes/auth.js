const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require('../models');

router.get('/', passport.authenticate('google', {
	scope: ['email', 'profile']
}));

router.get('/callback',
	passport.authenticate('google', {
		failureRedirect: '/error',
		successRedirect: '/dashboard'
	})
)

// Update user with BITS ID, Phone Number
router.post('/update', async (req, res) => {
	const user_id = req.session.passport.user;
	const { bits_id, phone }  =  req.body;
	
	await User.updateOne({
		_id: user_id
	}, {
		bits_id,
		phone	
	});

	res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
	req.logout();
	req.session = null;
	res.redirect('/');
});

module.exports = router;
