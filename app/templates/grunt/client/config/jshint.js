module.exports = {
  client: {
    options: {
      jshintrc: '<%%= yeoman.client %>/.jshintrc'
    },
    src: ['<%%= yeoman.client %>/{app,components}/**/*.js',
      '!<%%= yeoman.client %>/{app,components}/**/*.spec.js',
      '!<%%= yeoman.client %>/{app,components}/**/*.mock.js'
    ]
  },
  clientTest: {
    options: {
      jshintrc: '<%%= yeoman.client %>/.jshintrc'
    },
    src: ['<%%= yeoman.client %>/{app,components}/**/*.spec.js',
      '<%%= yeoman.client %>/{app,components}/**/*.mock.js'
    ]
  }
};
