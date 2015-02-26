module.exports.tasks = {
  injector: {
    sass: {
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
        '<%%= yeoman.client %>/app/app.scss': ['<%%= yeoman.client %>/{app,components}/**/*.{scss,sass}',
          '!<%%= yeoman.client %>/app/app.{scss,sass}'
        ]
      }
    }
  },

  watch: {
    injectSass: {
      files: ['<%%= yeoman.client %>/{app,components}/**/*.{scss,sass}'],
      tasks: ['injector:sass']
    }
  }
};
