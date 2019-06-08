//
// Admin API
//
const express = require('express');
const courseAdmin = require('./course');
const superAdmin = require('./super');
const router = express.Router();

// course admin
router.use('/courses', courseAdmin);
// super admin
router.use('/super', superAdmin);

module.exports = router;
