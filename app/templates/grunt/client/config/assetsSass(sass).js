module.exports.tasks = {
  concurrent: {
    assetsCompile: ['assetsSass'],
    assetsDist: ['assetsSass']
  },

  watch: {
    assetsSass: {
      files: ['<%%= yeoman.client %>/{app,components}/**/*.{scss,sass}'],
      tasks: ['assetsSass', 'autoprefixer']
    }
  }
};
