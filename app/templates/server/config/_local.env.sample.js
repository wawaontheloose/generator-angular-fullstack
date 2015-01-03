'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:                   'http://localhost:9000',
  SESSION_SECRET:           '<%= _.slugify(appname) + "-secret" %>',<% if (filters.facebookAuth) { %>

  FACEBOOK_ID:              'app-id',
  FACEBOOK_SECRET:          'secret',<% } if (filters.twitterAuth) { %>

  TWITTER_ID:               'app-id',
  TWITTER_SECRET:           'secret',<% } if (filters.googleAuth) { %>

  GOOGLE_ID:                'app-id',
  GOOGLE_SECRET:            'secret',<% } if (filters.email) { %>

  SMTP_TRANSPORT_USER:      'username',
  SMTP_TRANSPORT_PASS:      'password',<% if (mailTransports.indexOf('smtp-pool') >= 0) { %>

  SMTP_POOL_USER:           'username',
  SMTP_POOL_PASS:           'password',<% } if (mailTransports.indexOf('ses-transport') >= 0) { %>

  SES_TRANSPORT_ID:         'AWSACCESSKEY',
  SES_TRANSPORT_KEY:        'AWS/Secret/key',<% } if (mailTransports.indexOf('sendgrid-transport') >= 0) { %>

  SENDGRID_TRANSPORT_USER:  'SENDGRID_USERNAME',
  SENDGRID_TRANSPORT_KEY:   'SENDGRID_PASSWORD',<% } } %>

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
