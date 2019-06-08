//
// Admin API Test
//
const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require('../bin/www')

chai.use(chaiHttp);
