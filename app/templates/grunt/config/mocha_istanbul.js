module.exports = {
  unit: {
    options: {
      excludes: ['**/*.spec.js', '**/*.mock.js', '**/*.integration.js'],
      reporter: 'spec',
      require: ['mocha.conf.js'],
      mask: '**/*.spec.js',
      coverageFolder: 'coverage/server/unit'
    },
    src: 'server'
  },
  integration: {
    options: {
      excludes: ['**/*.spec.js', '**/*.mock.js', '**/*.integration.js'],
      reporter: 'spec',
      require: ['mocha.conf.js'],
      mask: '**/*.integration.js',
      coverageFolder: 'coverage/server/integration'
    },
    src: 'server'
  }
};