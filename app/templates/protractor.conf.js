// Protractor configuration
// https://github.com/angular/protractor/blob/master/referenceConf.js

'use strict';

var config = {
  // The timeout for each script run on the browser. This should be longer
  // than the maximum time your application needs to stabilize between tasks.
  allScriptsTimeout: 110000,

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:' + (process.env.PORT || '9000'),

  // list of files / patterns to load in the browser
  specs: [
    'e2e/**/*.spec.js'
  ],

  // Patterns to exclude.
  exclude: [],

  // ----- Capabilities to be passed to the webdriver instance ----
  //
  // For a full list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // and
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  capabilities: {
    'browserName': 'chrome'
  },

  // ----- The test framework -----
  //
  // Jasmine and Cucumber are fully supported as a test and assertion framework.
  // Mocha has limited beta support. You will need to include your own
  // assertion framework if working with mocha.
  framework: 'jasmine',

  // ----- Options to be passed to minijasminenode -----
  //
  // See the full list at https://github.com/juliemr/minijasminenode
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  // Prepare environment for tests
  params: {
    serverConfig: require('./server/config/environment')
  },

  onPrepare: function() {
    var serverConfig = config.params.serverConfig;

    // Setup mongo tests
    var mongoose = require('mongoose-bird')();
    mongoose.connect(serverConfig.mongo.uri, serverConfig.mongo.options); // Connect to database
  }
};

// Set SauceLabs environment for Travis
if (process.env.TRAVIS) {
  config.seleniumAddress = 'http://localhost:4445/wd/hub';
  config.capabilities = {
    // Credientials for Saucelabs
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,

    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    name: 'generator-angular-fullstack build ' + process.env.TRAVIS_BUILD_NUMBER
  };
}

config.params.baseUrl = config.baseUrl;
exports.config = config;
