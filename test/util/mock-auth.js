//
// Mock auth strategy
//
const passport = require('passport-strategy')
const util = require('util')
const user = require('../data/mock-profile')

function Strategy(name, callBack) {
	if (!name || name.length == 0)
		throw new TypeError('Strategy requires a name')

	passport.Strategy.call(this)
	this.name = name
	this._user = user;
	this._cb = callBack;
}

util.inherits(Strategy, passport.Strategy)

// Called on /auth/callback
Strategy.prototype.authenticate = function() {
	this._cb(null, null, this._user, (error, user) => {
		this.success(user);
	});
}

module.exports = {
	Strategy
}
