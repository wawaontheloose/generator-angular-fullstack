module.exports = function(grunt) {

  grunt.registerTask('assets', function(target) {
    if (target === 'dist') {
      return grunt.task.run([
        'clean:dist',
        'concurrent:assetsDist',
        'concurrent:assetsWire',
        'useminPrepare',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
      ]);
    }

    grunt.task.run([
      'clean:tmp',
      'concurrent:assetsCompile',
      'concurrent:assetsWire'
    ]);

  });

};
