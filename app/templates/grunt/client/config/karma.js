module.exports.tasks = {
  karma: {
    unit: {
      configFile: 'karma.conf.js',
      singleRun: true
    }
  },

  watch: {
    jsTest: {
      files: ['<%%= yeoman.client %>/{app,components}/**/*.spec.js',
        '<%%= yeoman.client %>/{app,components}/**/*.mock.js'
      ],
      tasks: ['newer:jshint:all', 'karma']
    }
  }
};
