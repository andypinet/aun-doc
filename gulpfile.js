var gulp = require('gulp');
var twig = require('gulp-twig');
var rename = require("gulp-rename");

gulp.task('templates', function() {
  gulp.src('./src/*.twig')
    .pipe(twig())
    .pipe(rename(function(path) {
      path.extname = ".md"
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('watch-tpl', function() {
  gulp.watch('./src/*.twig', ['templates']);
});