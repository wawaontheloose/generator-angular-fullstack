module.exports.tasks = {
  concurrent: {
    assetsCompile: ['assetsLess'],
    assetsDist: ['assetsLess']
  },

  watch: {
    assetsLess: {
      files: ['<%%= yeoman.client %>/{app,components}/**/*.less'],
      tasks: ['assetsLess', 'autoprefixer']
    }
  }
};
