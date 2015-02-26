module.exports.tasks = {
  watch: {
    coffeeTest: {
      files: ['<%%= yeoman.client %>/{app,components}/**/*.spec.{coffee,litcoffee,coffee.md}'],
      tasks: ['karma']
    }
  }
}
