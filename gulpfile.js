var gulp = require('gulp');
var twig = require('gulp-twig');
var rename = require("gulp-rename");
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var through = require('through2'); 
var yaml = require('js-yaml');
var config = require('./config');

if (!config.docsrc) {
  throw new Error("you need set config.docsrc");
}

function location(realtivepath) {
  return config.docsrc + "/" + realtivepath;
}

gulp.task('templates', function() {
  gulp.src(location('**/*.twig'))
    .pipe(twig())
    .pipe(rename(function(path) {
      path.extname = ".md"
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch-tpl', function() {
  gulp.watch(location('**/*.twig'), ['templates']);
});

gulp.task('sass', () =>
    sass(location('style.css'))
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))        
        .pipe(gulp.dest('dist'))
);

gulp.task('watch-sass', () => {
  gulp.watch(location('style.css'), ['sass']);
});

var globalSearch = [];

var handlerSearch = function() {
  function handlerFile(file) {
    var path = file.history[0];
    var contents = file.contents.toString();
    var mar = contents.match(/<\s*sfi((\s+[^<>]+\s*>)|(\s*>))[^<>]*<\s*\/sfi\s*>/g);    
    var def = "";
    if (mar && mar.length > 0) {
      def = mar[0].replace('<sfi>', '').replace('</sfi>', '').trim();
      globalSearch.push(Object.assign({
        relativePath: path.replace(file.base, '')
      }, yaml.load(def)));
      console.dir(globalSearch);
    }
  }

  return through.obj(function(file, encoding, callback) {
    callback(null, handlerFile(file));
  });
}

gulp.task('sfi', () => {
  gulp.src("dist/**/*.md")
    .pipe(handlerSearch())
});