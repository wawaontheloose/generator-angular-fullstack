// Server task

module.exports = function(grunt) {
  grunt.registerTask('server', 'Start the project server', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'env:all',
        'env:prod',
        'express:prod',
        'wait',
        'open',
        'express-keepalive']);
    }

    if (target === 'debug') {
      return grunt.task.run([
        'env:all',
        'concurrent:debug'
      ]);
    }

    grunt.task.run([
      'env:all',
      'express:dev',
      'wait',
      'open',
      'watch'
    ]);
  });
};
