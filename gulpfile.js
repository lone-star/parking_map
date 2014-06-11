var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

var rimraf = require('rimraf');

var server = require('./server');

var paths = {
  scripts: ['app/**/*.js'],
  lessEndPoint: ['app/styles/app.less'],
  lessFiles: ['app/**/*.less'],

  vendorScripts: ['vendors/**/*.js'],
  vendorStyles: ['vendors/**/*.css']
};

gulp.task('clean-app', function(cb){
  rimraf('build/**/app.*', cb);
});

gulp.task('clean-build', function(cb){
  // Needs to be synchronous otherwise getting: ENOTEMPTY
  rimraf.sync('build/js');
  rimraf.sync('build/css');
  cb();
});

gulp.task('lint', function(){
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('vendor-scripts', function(){
  return gulp.src(paths.vendorScripts)
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('vendor-styles', function(){
  return gulp.src(paths.vendorStyles)
    .pipe(concat('vendors.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function() {
  return gulp.src('app/src/app.js')
    .pipe(browserify())
//    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('styles', function() {
  return gulp.src(paths.lessEndPoint)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts.concat(paths.lessFiles), ['lint', 'scripts', 'styles']);
});

gulp.task('server', server.start);

gulp.task('default', [
          'clean-build',

          // app code
          'scripts',
          'styles',

          // vendors code
          'vendor-scripts',
          'vendor-styles',

          'server',
          'watch'
]);





