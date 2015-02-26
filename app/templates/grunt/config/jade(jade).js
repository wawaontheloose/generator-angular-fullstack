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
    server: ['jade'],
    test: ['jade'],
    dist: ['jade']
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
