module.exports = function(grunt) {
    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
        src:['js/*.js'],
	      dest:'js/build/illegal.js'
        },
sass: {
  dev: {
    options: {
      style: 'expanded',
      compass: true
    },
    files: {
      'dist/css/illegal-jquery.css': 'src/css/illegal-jquery.scss'
    }
  },
  dist: {
    options: {
      style: 'compressed',
      compass: true
    },
    files: {
      'dist/css/illegal-jquery.css': 'src/css/illegal-jquery.scss'
    }
  }
},
watch: {
  scripts: {
    files: ['src/css/*'],
    tasks: ['sass:dev'],
    options: {
      spawn: false,
    },
  },
},
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat']);
    grunt.registerTask('serve', ['watch']);

};
