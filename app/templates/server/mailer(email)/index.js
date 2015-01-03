'use strict';

var path = require('path'),
    nodemailer = require('nodemailer'),
    emailTemplates = require('email-templates'),
    config = require('../config/environment'),
    mailConfig = config.mail,
    templatesDir = path.resolve(__dirname, 'templates');

var extraTransports = {<% for (var i = 0, mailTransportsLength = mailTransports.length; i < mailTransportsLength; i++) { %>
  '<%= mailTransports[i] %>': require('nodemailer-<%= mailTransports[i] %>')<% if (i == mailTransportsLength - 1) { %>
<% } else { %>,<% }} %>};

/**
 * Get a nodemailer transport
 * @param  {string} type         - type of transport
 * @param  {Object} transportOps - options to configure the transport
 * @return {Object}              - a nodemailer transport
 *
 * @see https://github.com/andris9/Nodemailer#available-transports
 */
var getTransport = function(type, transportOps) {
  type = type || mailConfig.transport;
  transportOps = transportOps || mailConfig.transports[type];

  if (Object.keys(extraTransports).indexOf(type) >= 0) {
    return nodemailer.createTransport(extraTransports[type](transportOps));
  }

  return nodemailer.createTransport(transportOps);
};

/**
 * Render a template by name given a locals object or array of locals objects
 * @param  {String}   templateName - name of the template
 * @param  {Mixed}    locals       - locals object or array of locals objects
 * @param  {Function} cb           - callback for rendered template(s), will be called for each template rendered
 *
 * @see https://github.com/niftylettuce/node-email-templates#basic
 */
var renderTemplate = function(templateName, locals, cb) {
  emailTemplates(templatesDir, function(err, template) {
    if (err) { return cb(err); }

    if (Array.isArray(locals)) {
      // batch templates
      var Render = function(l) {
        this.locals = l;
        this.send = function(err, html, text) {
          if (err) { return cb(err); }

          cb(null, html, text, l);
        };
        this.batch = function(batch) {
          batch(this.locals, templatesDir, this.send);
        }
      };

      template(templateName, true, function(err, batch) {
        for (var i = 0, localsLength = locals.length; i < localsLength; i++) {
          (new Render(locals[i])).batch(batch);
        }
      });
    } else {
      // single template
      template(templateName, locals, function(err, html, text) {
        if (err) { return cb(err); }

        cb(null, html, text, locals);
      });
    }
  });
};

/**
 * Send email(s)
 * @param  {Mixed}    mailing - mailing object or array of mailing objects
 * @param  {Object}   options - options for sending email (optional)
 * @param  {Function} callback
 *
 * @example
 * sendMail({
 *   email: 'customer@example.com',   // required
 *   from: 'mailer@example.com',      // optional (defaults to global config value)
 *   subject: 'Your new message',     // optional
 *   message: 'This is your message'  // all properties get passed to templating as locals
 * }, {
 *   template: 'newMessage',              // template name
 *   transport: 'ses-transport',          // nodemailer-* transport
 *   options: {                           // transport options
 *     accessKeyId: 'AWSACCESSKEY',
 *     secretAccessKey: 'AWS/Secret/key'
 *   }
 * }, function(err, response, mailing) {
 *   if (!err) {
 *     console.log('sent: ' + JSON.stringify(mailing));
 *     console.log('response: ' + JSON.stringify(response));
 *   }
 * });
 */
var sendMail = function(mailing) {
  var cb = function(){return true;};
  var options = {};
  if (arguments.length == 2) {
    if (Object.prototype.toString.call(arguments[1]) === '[object Function]') {
      cb = arguments[1];
    } else {
      options = arguments[1];
    }
  } else if (arguments.length >= 3) {
    options = arguments[1];
    cb = arguments[2];
  }

  var transport = getTransport(options.transport, options.options);
  var send = function(ops, html, text, callback) {
    callback = callback || cb;
    transport.sendMail({
      from: ops.from || mailConfig.fromAddress,
      to: ops.to,
      subject: ops.subject || '<%= appname %>',
      html: html || ops.html,
      text: text || ops.text
    }, callback);
  }

  if (options.template) {
    renderTemplate(options.template, mailing, function(err, html, text, locals) {
      send(locals, html, text);
    });
  } else {
    if (Array.isArray(mailing)) {
      for (var i = 0, mailingLength = mailing.length; i < mailingLength; i++) {
        send(mailing[i], null, null, function(err, res) {
          cb(err, res, mailing[i]);
        });
      }
    } else {
      send(mailing, null, null, function(err, res) {
        cb(err, res, mailing);
      });
    }
  }
};

/* Export public methods */
exports.sendMail = sendMail;
