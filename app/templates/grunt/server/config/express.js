module.exports.tasks = {
  express: {
    options: {
      port: process.env.PORT || 9000
    },
    dev: {
      options: {
        script: 'server/app.js',
        debug: true
      }
    },
    prod: {
      options: {
        script: 'dist/server/app.js'
      }
    }
  },

  watch: {
    express: {
      files: ['server/**/*.{js,json}'],
      tasks: ['express:dev', 'wait'],
      options: {
        livereload: true,
        nospawn: true
      }
    }
  }
};
