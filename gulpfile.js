var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    sync = require('browser-sync').create();

gulp.task('jade', function() {
  gulp.src('./src/**/*.jade')
   .pipe(jade())
   .pipe(gulp.dest('./dist/'))
})

gulp.task('sass', function() {
  gulp.src('./src/styles/**/*.sass')
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(sync.stream());
});

gulp.task('serve', ['sass', 'jade'], function() {
  sync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch('./src/styles/**/*.sass', ['sass']);
  gulp.watch('./src/**/*.jade', ['jade']);
  gulp.watch('./dist/**/*.html').on('change', sync.reload);
});

gulp.task('default', ['serve']);
