module.exports = {
  html: ['<%%= yeoman.dist %>/client/{,*/}*.html'],
  css: ['<%%= yeoman.dist %>/client/{,*/}*.css'],
  js: ['<%%= yeoman.dist %>/client/{,*/}*.js'],
  options: {
    assetsDirs: ['<%%= yeoman.dist %>/client',
      '<%%= yeoman.dist %>/client/assets/images'
    ],
    patterns: {
      js: [
        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm,
          'Update the JS to reference our revved images'
        ]
      ]
    }
  }
};
