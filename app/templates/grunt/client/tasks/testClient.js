// Run project's testing frameworks

module.exports = function(grunt) {
  grunt.registerTask('testClient', function(target, option) {
    if (option !== 'skip-assets') {
      grunt.task.run(['assets']);
    }

    if (target === 'integration') {
      return grunt.task.run(['protractor']);
    }

    grunt.task.run(['karma']);

  });
};
