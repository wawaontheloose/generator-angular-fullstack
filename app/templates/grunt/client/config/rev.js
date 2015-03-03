module.exports = {
  dist: {
    files: {
      src: ['<%%= yeoman.dist %>/client/{,*/}*.js',
        '<%%= yeoman.dist %>/client/{,*/}*.css',
        '<%%= yeoman.dist %>/client/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
        '<%%= yeoman.dist %>/client/assets/fonts/*'
      ]
    }
  }
};
