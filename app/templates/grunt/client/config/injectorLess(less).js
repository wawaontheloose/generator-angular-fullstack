module.exports.tasks = {
  injector: {
    less: {
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
        '<%%= yeoman.client %>/app/app.less': ['<%%= yeoman.client %>/{app,components}/**/*.less',
          '!<%%= yeoman.client %>/app/app.less'
        ]
      }
    }
  }
};
