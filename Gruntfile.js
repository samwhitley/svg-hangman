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
    },
    cssmin: {
      combine: {
        files: {
          'styles/styles-min.css' : [
            'styles/jquery-ui.min.css',
            'styles/jquery.jscrollpane.css',
            'styles/normalize.css',
            'styles/style.css'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['uglify', 'cssmin']);
};