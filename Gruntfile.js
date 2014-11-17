module.exports = function(grunt) {

  var allJSFiles = [
    'scripts/jquery-1.11.1.min.js',
    'scripts/jquery-ui.min.js',
    'scripts/velocity.min.js',
    'scripts/jquery.mousewheel.js',
    'scripts/jquery.jscrollpane.min.js',
    'scripts/puzzle.js',
    'scripts/terminal.js',
    'scripts/gameScreen.js',
    'scripts/controller.js',
    'scripts/menu.js',
    'scripts/main.js'
  ],
  myJSFiles = [
    'scripts/puzzle.js',
    'scripts/terminal.js',
    'scripts/gameScreen.js',
    'scripts/controller.js',
    'scripts/menu.js',
    'scripts/main.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: myJSFiles
    },
    uglify: {
      js: {
        files: {
          'scripts/scripts-min.js': allJSFiles
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
};