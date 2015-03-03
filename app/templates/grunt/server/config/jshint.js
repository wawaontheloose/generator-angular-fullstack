module.exports = {
  server: {
    options: {
      jshintrc: 'server/.jshintrc'
    },
    src: ['server/**/*.js', '!server/**/*.{spec,integration}.js']
  },
  serverTest: {
    options: {
      jshintrc: 'server/.jshintrc-spec'
    },
    src: ['server/**/*.{spec,integration}.js']
  }
};
