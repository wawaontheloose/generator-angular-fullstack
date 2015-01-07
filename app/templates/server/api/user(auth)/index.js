'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');<% if (filters.userEmails) { %>
var config = require('../../config/environment');<% } %>

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);<% if (filters.userEmails) { %>
router.post('/resetpassword', controller.sendPasswordReset);
router.post('/verifyemail', controller.sendEmailVerification);<% } %>
router.post('/'<% if (filters.userEmails) { %>, auth.verifyRequestToken(config.secrets.verify, config.userAccounts.verifyNewEmail)<% } %>, controller.create);

module.exports = router;
