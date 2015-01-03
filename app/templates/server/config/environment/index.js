'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: '<%= _.slugify(_.humanize(appname)) + '-secret' %>'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }<% if (filters.facebookAuth) { %>,

  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  }<% } %><% if (filters.twitterAuth) { %>,

  twitter: {
    clientID:     process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  }<% } %><% if (filters.googleAuth) { %>,

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  }<% } %><% if (filters.email) { %>,

  mail: {
    // default from address
    fromAddress: '<%= appname %> <<%= scriptAppName %>@example.com>',

    // default mail transport
    transport: 'smtp-transport',

    // transport configurations
    transports: {
      /**
       * @see https://github.com/andris9/nodemailer-smtp-transport#usage
       */
      'smtp-transport': {
        host: 'localhost',
        port: 25,
        auth: {
          user: process.env.SMTP_TRANSPORT_USER || 'username',
          pass: process.env.SMTP_TRANSPORT_PASS || 'password'
        }
      }<% if (mailTransports.indexOf('smtp-pool') >= 0) { %>,

      /**
       * @see https://github.com/andris9/nodemailer-smtp-pool#usage
       */
      'smtp-pool': {
        host: 'localhost',
        port: 25,
        auth: {
          user: process.env.SMTP_POOL_USER || 'username',
          pass: process.env.SMTP_POOL_PASS || 'password'
        },
        maxConnections: 5,
        maxMessages: 10
      }<% } %><% if (mailTransports.indexOf('ses-transport') >= 0) { %>,

      /**
       * @see https://github.com/andris9/nodemailer-ses-transport#usage
       */
      'ses-transport': {
        accessKeyId: process.env.SES_TRANSPORT_ID || 'AWSACCESSKEY',
        secretAccessKey: process.env.SES_TRANSPORT_KEY || 'AWS/Secret/key',
        rateLimit: 1 // do not send more than 1 message in a second
      }<% } %><% if (mailTransports.indexOf('sendmail-transport') >= 0) { %>,

      /**
       * @see https://github.com/andris9/nodemailer-sendmail-transport#usage
       */
      'sendmail-transport': {
        path: '/usr/share/sendmail'
      }<% } %><% if (mailTransports.indexOf('pickup-transport') >= 0) { %>,

      /**
       * @see https://github.com/andris9/nodemailer-pickup-transport#usage
       */
      'pickup-transport': {
        directory: 'C:\\inetpub\\mailroot\\Pickup'
      }<% } %><% if (mailTransports.indexOf('sendgrid-transport') >= 0) { %>,

      /**
       * @see https://github.com/sendgrid/nodemailer-sendgrid-transport#usage
       */
      'sendgrid-transport': {
        auth: {
          api_user: process.env.SENDGRID_TRANSPORT_USER || 'SENDGRID_USERNAME',
          api_key: process.env.SENDGRID_TRANSPORT_KEY || 'SENDGRID_PASSWORD'
        }
      }<% } %>
    }
  }<% } %>
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
