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
    docco: {
      app: {
        src: ['fluent-time.js']
      }
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
    mocha: {
      // runs all html files in the test dir
      all: [ 'spec/**/*.html' ]
    },
    min: {
      dist: {
        src: ['<banner>', 'fluent-time.js'],
        dest: 'fluent-time.min.js'
      }
    },
    watch: {
      files: ['spec/**/*.js', 'fluent-time.js'],
      tasks:'lint min simplemocha mocha'
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
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-docco');

  // Default task.
  grunt.registerTask('default', 'lint min simplemocha mocha watch');

};
