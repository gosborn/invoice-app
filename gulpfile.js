var gulp = require('gulp'),
webpack = require('gulp-webpack');
var babel = require('gulp-babel')

gulp.task("webpack", function() {
  return gulp.src("app/assets/javascripts/entry.js")
  .pipe(webpack(require("./config/webpack.config.js")))
  .pipe(gulp.dest("app/assets/javascripts/"));
});

gulp.task("watch", function() {
  gulp.watch(["app/assets/javascripts/**/*.js", "!app/assets/javascripts/bundle.js", "app/assets/javascripts/**/*.jsx"], ["webpack"]);
});

gulp.task("default", ["watch"]);