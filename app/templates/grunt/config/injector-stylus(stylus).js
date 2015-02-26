module.exports.tasks = {
  injector: {
    stylus: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/client/app/', '');
          filePath = filePath.replace('/client/components/', '');
          return '@import \'' + filePath + '\';';
        },
        starttag: '// injector',
        endtag: '// endinjector'
      },
      files: {
        '<%%= yeoman.client %>/app/app.styl': ['<%%= yeoman.client %>/{app,components}/**/*.styl',
          '!<%%= yeoman.client %>/app/app.styl'
        ]
      }
    }
  },

  watch: {
    injectStylus: {
      files: ['<%%= yeoman.client %>/{app,components}/**/*.styl'],
      tasks: ['injector:stylus']
    }
  }
};
