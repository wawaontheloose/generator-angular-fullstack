module.exports.tasks = {
  stylus: {
    server: {
      options: {
        paths: ['<%%= yeoman.client %>/bower_components',
          '<%%= yeoman.client %>/app',
          '<%%= yeoman.client %>/components'
        ],
        'include css': true
      },
      files: {
        '.tmp/app/app.css': '<%%= yeoman.client %>/app/app.styl'
      }
    }
  },

  concurrent: {
    server: ['stylus'],
    test: ['stylus'],
    dist: ['stylus']
  },

  watch: {
    stylus: {
      files: ['<%%= yeoman.client %>/{app,components}/**/*.styl'],
      tasks: ['stylus', 'autoprefixer']
    }
  }
};
