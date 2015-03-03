module.exports = {
  options: {
    config: '.jscs.json'
  },
  client: {
    files: {
      src: ['<%%= yeoman.client %>/{app,components}/**/*.js']
    }
  }
};
