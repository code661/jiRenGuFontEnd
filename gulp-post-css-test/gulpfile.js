var gulp = require('gulp')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var cssnano = require('gulp-cssnano')

gulp.task('css',function(){
  return gulp.src('./src/css/**/*.css')
             .pipe(sourcemaps.init())
             .pipe(cssnano())
             .pipe(concat('bundle.css'))
             .pipe(sourcemaps.write('.'))
             .pipe(gulp.dest('./src/css'))
})

gulp.task('watch',function(){
  gulp.watch('./src/css/**/*.css',['css'])
})

gulp.task('default',['css'])