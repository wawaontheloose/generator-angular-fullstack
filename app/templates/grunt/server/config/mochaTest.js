module.exports.tasks = {
  mochaTest: {
    options: {
      reporter: 'spec',
      require: 'mocha.conf.js'
    },
    unit: {
      src: ['server/**/*.spec.js']
    },
    integration: {
      src: ['server/**/*.integration.js']
    }
  },

  watch: {
    mochaTest: {
      files: ['server/**/*.spec.js'],
      tasks: ['env:test', 'mochaTest']
    }
  }
};
