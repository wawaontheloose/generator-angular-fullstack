module.exports = {
  dist: {
    files: [{
      expand: true,
      dest: '<%%= yeoman.dist %>',
      src: ['package.json', 'server/**/*']
    }]
  }
};
