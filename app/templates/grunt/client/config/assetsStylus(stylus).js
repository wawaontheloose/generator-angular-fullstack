module.exports.tasks = {
  concurrent: {
    assetsCompile: ['assetsStylus'],
    assetsDist: ['assetsStylus']
  },

  watch: {
    assetsStylus: {
      files: ['<%%= yeoman.client %>/{app,components}/**/*.styl'],
      tasks: ['assetsStylus', 'autoprefixer']
    }
  }
};