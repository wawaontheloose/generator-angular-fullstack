'use strict';

var express = require('express');
var config = require('../config/environment');

var router = express.Router();

router.get('/app.js', function(req, res, next) {
  res.type('text/javascript').send('window.<%= scriptAppName %>Config = ' + JSON.stringify({
    domain: process.env.DOMAIN,
    userAccounts: config.userAccounts
  }) + ';');
});

module.exports = router;
