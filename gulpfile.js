var gulp = require('gulp');
var twig = require('gulp-twig');
var rename = require("gulp-rename");
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('templates', function() {
  gulp.src('./src/**/*.twig')
    .pipe(twig())
    .pipe(rename(function(path) {
      path.extname = ".md"
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('watch-tpl', function() {
  gulp.watch('./src/**/*.twig', ['templates']);
});

gulp.task('sass', () =>
    sass('src/style.scss')
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))        
        .pipe(gulp.dest('dist'))
);