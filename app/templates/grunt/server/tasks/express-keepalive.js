// Keep grunt running

module.exports = function(grunt) {
  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });
};