// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    buildcontrol: 'grunt-build-control',
    istanbul_check_coverage: 'grunt-mocha-istanbul'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the project level configuration
  var config = {
    // load-grunt-config settings
    config: {
      src: 'grunt/{client,server}/config/**.js',
      mergeCustomizer: function(a, b) {
        return Array.isArray(a) ? a.concat(b) : undefined;
      }
    },

    // Project config
    yeoman: {
      client: require('./bower.json').appPath || 'client',
      dist: 'dist'
    },
    pkg: grunt.file.readJSON('./package.json'),

    // Project level watch config
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    // Project build control config
    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      heroku: {
        options: {
          remote: 'heroku',
          branch: 'master'
        }
      },
      openshift: {
        options: {
          remote: 'openshift',
          branch: 'master'
        }
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      }
    }
  };

  // Load client, server, and project configs
  grunt.initConfig(require('load-grunt-configs')(grunt, config));

  // Load client and server tasks
  grunt.loadTasks('grunt/client/tasks');
  grunt.loadTasks('grunt/server/tasks');

  // Project serve task
  grunt.registerTask('serve', function(target) {
    target = (target ? ':' + target : '');

    grunt.task.run(['assets' + target, 'server' + target]);
  });

  // Project build task
  grunt.registerTask('build', ['assets:dist']);

  // Project test task
  grunt.registerTask('test', function(target, option) {
    option = (option ? ':' + option : '');
    if (target === 'server') {
      return grunt.task.run(['testServer' + option]);
    }

    if (target === 'client') {
      return grunt.task.run(['testClient']);
    }

    if (target === 'e2e') {

      if (option === 'prod') {
        return grunt.task.run([
          'assets:dist',
          'server:dist',
          'testClient:integration:skip-assets'
        ]);
      }

      return grunt.task.run([
        'assets',
        'server',
        'testClient:integration:skip-assets'
      ]);
    }

    if (target === 'coverage') {
      return grunt.task.run(['testServer:coverage']);
    }

    grunt.task.run(['testClient', 'testServer']);
  });

  // Project default task
  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
