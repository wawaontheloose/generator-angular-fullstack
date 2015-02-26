module.exports = {
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    files: ['{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.css',
      '{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.html',
      '{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.js',
      '!{.tmp,<%%= yeoman.client %>}{app,components}/**/*.spec.js',
      '!{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.mock.js',
      '<%%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    options: {
      livereload: true
    }
  }
};
