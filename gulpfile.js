var gulp= require('gulp');
var browserSync= require('browser-sync').create();
var useref = require('gulp-useref');
var uglify= require('gulp-uglify');
var gulpIf= require('gulp-if');
var cssnano= require('gulp-cssnano');
var imagemin= require('gulp-imagemin');
var cache= require('gulp-cache');
var del= require('del');
var Promise = require('es6-promise').Promise;
var runSequence= require('run-sequence');
var removeHtmlComments = require('gulp-remove-html-comments');


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ['./', './vilabusinessgroup'],
    },
  })
});

gulp.task('useref', function() {
  return gulp.src('*.html')
  .pipe(useref())
  .pipe(gulpIf('*.js', uglify()))
  .pipe(gulpIf('*.css', cssnano()))
  // .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(removeHtmlComments())
  .pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
  return gulp.src('images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('node_modules/semantic-ui-css/themes/**/*')
  .pipe(gulp.dest('dist/styles/themes'))
});

// gulp.task('views', function() {
//   return gulp.src('views/**/*')
//   .pipe(gulp.dest('dist/views'))
// });

// gulp.task('html', function () {
//   return gulp.src('views/**/*.html')
//     .pipe(templateCache())
//     .pipe(gulp.dest('public'));
// });

gulp.task('clean:dist', function() {
  return del.sync('dist')
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('styles/**/*.css', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('scripts/**/*.js', browserSync.reload);
});

gulp.task('default', function(callback) {
  runSequence(['browserSync', 'watch'], callback);
});

gulp.task('build', function(callback) {
  runSequence('clean:dist', ['useref', 'images', 'fonts'], callback);
});