module.exports.tasks = {
  injector: {
    options: {},
    scripts: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/client/', '');
          filePath = filePath.replace('/.tmp/', '');
          return '<script src="' + filePath + '"></script>';
        },
        starttag: '<!-- injector:js -->',
        endtag: '<!-- endinjector -->'
      },
      files: {
        '<%%= yeoman.client %>/index.html': [
          ['{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.js',
            '!{.tmp,<%%= yeoman.client %>}/app/app.js',
            '!{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.spec.js',
            '!{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.mock.js'
          ]
        ]
      }
    },
    css: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/client/', '');
          filePath = filePath.replace('/.tmp/', '');
          return '<link rel="stylesheet" href="' + filePath + '">';
        },
        starttag: '<!-- injector:css -->',
        endtag: '<!-- endinjector -->'
      },
      files: {
        '<%%= yeoman.client %>/index.html': ['<%%= yeoman.client %>/{app,components}/**/*.css']
      }
    }
  },

  concurrent: {
    assetsWire: ['injector:scripts', 'injector:css']
  },

  watch: {
    injectJS: {
      files: ['<%%= yeoman.client %>/{app,components}/**/*.js',
        '!<%%= yeoman.client %>/{app,components}/**/*.spec.js',
        '!<%%= yeoman.client %>/{app,components}/**/*.mock.js',
        '!<%%= yeoman.client %>/app/app.js'
      ],
      tasks: ['injector:scripts']
    },
    injectCss: {
      files: ['<%%= yeoman.client %>/{app,components}/**/*.css'],
      tasks: ['injector:css']
    }
  }
};
