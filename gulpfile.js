var gulp      = require('gulp');
var gutil     = require('gulp-util');
var uglify    = require('gulp-uglify');
var jshint    = require('gulp-jshint');
var plumber   = require('gulp-plumber');
var rename    = require('gulp-rename');

// jshint
// ---------------------

gulp.task('jshint', function() {

  gulp
    .src('fluent-time.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

});

// scripts
// ----------------------

gulp.task('scripts', function() {

  gulp
    .src('fluent-time.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./'));

});

gulp.task('watch', function() {
  gulp.watch('fluent-time.js', ['jshint', 'scripts']);
});

gulp.task('default', ['jshint', 'scripts', 'watch']);
