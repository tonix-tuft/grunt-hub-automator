/**
 * Grunt Hub Automator.
 *
 * This file is a sample.
 * 
 * Copy this file and save it in the same directory with the name Gruntfile.js.
 * 
 * Edit the hub.all.src to point to your Gruntfile locations (your Grunt projects).
 * 
 * Then create a grunt-hub-automator daemon script that will run the Grunt Hub Automator
 * (use the provided grunt-hub-automator.sample).
 * 
 * Start the grunt-hub-automator daemon script and you're done.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    hub: {
      all: {
        src: ['/path/to/*/Gruntfile.js']
        //, tasks: ['yourtask'] // Uncomment this line and add the tasks to execute for each project found by Grunt Hub Automator.
      }
    }
  });

  grunt.loadNpmTasks('grunt-hub');

  grunt.registerTask('default', ['hub']);
};
