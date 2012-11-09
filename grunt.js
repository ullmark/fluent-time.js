/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> */'
    },
    lint: {
      files: ['grunt.js', 'fluent-time.js', '<simplemocha:all.src>']
    },
    simplemocha: {
      all: {
        src: 'spec/**/*.js',
        options: {
          globals: ['should'],
          timeout: 3000,
          ignoreLeaks: false,
          ui: 'bdd',
          reporter: 'tap'
        }
      }
    },
    min: {
      dist: {
        src: ['<banner>', 'fluent-time.js'],
        dest: 'fluent-time.min.js'
      }
    },
    watch: {
      files: ['spec/**/*.js', 'fluent-time.js'],
      tasks:'lint simplemocha min'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {
        window: true,
        module: true,
        setTimeout: true,
        clearTimeout: true,
        console: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Default task.
  grunt.registerTask('default', 'lint simplemocha watch');

};
