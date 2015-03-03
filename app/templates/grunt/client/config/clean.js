module.exports = {
  dist: {
    files: [{
      dot: true,
      src: ['.tmp',
        '<%%= yeoman.dist %>/*',
        '!<%%= yeoman.dist %>/.git*',
        '!<%%= yeoman.dist %>/.openshift',
        '!<%%= yeoman.dist %>/Procfile'
      ]
    }]
  },
  tmp: '.tmp'
};
