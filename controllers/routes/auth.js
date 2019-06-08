const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require('../models');

router.get('/', passport.authenticate('google', {
	scope: ['email', 'profile']
}));

router.get('/callback',
	passport.authenticate('google', {
		failureRedirect: '/error'
	}), (req, res) => {
		res.redirect('/dashboard');	
	}
);

// Update user with BITS ID, Phone Number
router.post('/update', (req, res) => {
	const bits_id = req.params.bits_id;
	const phone = req.params.phone;
	
	User.update({
		bits_id,
		phone	
	})

});

router.get('/logout', (req, res) => {
	req.logout();
	req.session = null;
	res.redirect('/');
});

module.exports = router;
