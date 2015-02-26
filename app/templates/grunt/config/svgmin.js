module.exports.tasks = {
  svgmin: {
    dist: {
      files: [{
        expand: true,
        cwd: '<%%= yeoman.client %>/assets/images',
        src: '{,*/}*.svg',
        dest: '<%%= yeoman.dist %>/client/assets/images'
      }]
    }
  },

  concurrent: {
    dist: ['svgmin']
  }
};
