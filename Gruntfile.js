/*
 * assemble-examples <https://github.com/assemble/assemble-examples>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */


module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    clean: ['dest/'],
    assemble: {
      options: {
        flatten: true,
        partials: ['templates/includes/*.hbs'],
        layoutdir: 'templates/layouts',
        layout: 'default.hbs'
      },
      site: {
        files: {'dest/': ['templates/*.hbs']}
      }
    },
    copy: {
      assets: {
        files: [
          {expand: true, src: ['css/**'], dest: 'dest/'}
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dest'
        }
      }
    },

    watch: {
      site: {
        files: ['Gruntfile.js', 'template/**/*.hbs', 'js/**/*.js'],
        tasks: ['clean', 'assemble', 'sass', 'copy']
      }
    }
  });

  // Load the Assemble plugin.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // The default task to run with the `grunt` command.
  grunt.registerTask('dev', ['default', 'connect:server', 'watch:site']);
  grunt.registerTask('default', ['clean', 'assemble', 'copy']);
};