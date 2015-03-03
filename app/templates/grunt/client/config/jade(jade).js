module.exports.tasks = {
  jade: {
    compile: {
      options: {
        data: {
          debug: false
        }
      },
      files: [{
        expand: true,
        cwd: '<%%= yeoman.client %>',
        src: ['{app,components}/**/*.jade'],
        dest: '.tmp',
        ext: '.html'
      }]
    }
  },

  concurrent: {
    assetsCompile: ['jade'],
    assetsDist: ['jade']
  },

  watch: {
    jade: {
      files: ['<%%= yeoman.client %>/{app,components}/*',
        '<%%= yeoman.client %>/{app,components}/**/*.jade'
      ],
      tasks: ['jade']
    }
  }
};
