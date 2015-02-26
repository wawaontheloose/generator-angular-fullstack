module.exports.tasks = {
  coffee: {
    options: {
      sourceMap: true,
      sourceRoot: ''
    },
    server: {
      files: [{
        expand: true,
        cwd: 'client',
        src: ['{app,components}/**/*.coffee',
          '!{app,components}/**/*.spec.coffee'
        ],
        dest: '.tmp',
        ext: '.js'
      }]
    }
  },

  concurrent: {
    server: ['coffee'],
    test: ['coffee'],
    dist: ['coffee']
  },

  watch: {
    coffee: {
      files: ['<%%= yeoman.client %>/{app,components}/**/*.{coffee,litcoffee,coffee.md}',
        '!<%%= yeoman.client %>/{app,components}/**/*.spec.{coffee,litcoffee,coffee.md}'
      ],
      tasks: ['newer:coffee', 'injector:scripts']
    }
  }
};
