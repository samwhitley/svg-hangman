module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      js: {
        files: {
          'scripts/scripts-min.js': [
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
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
};