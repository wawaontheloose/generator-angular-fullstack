// Run project's testing frameworks

module.exports = function(grunt) {
  grunt.registerTask('testServer', function(target) {

    grunt.task.run(['env:all', 'env:test']);

    if (target === 'unit') {
      return grunt.task.run(['mochaTest:unit']);
    }

    if (target === 'integration') {
      return grunt.task.run(['mochaTest:integration']);
    }

    if (target === 'coverage') {
      return grunt.task.run(['mocha_istanbul', 'istanbul_check_coverage']);
    }

    grunt.task.run(['mochaTest:unit', 'mochaTest:integration']);

  });
};
