var gulp = require('gulp')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')

gulp.task('css',function(){
  var plugins = [
    autoprefixer({bowsers: ['last 1 version']}),
  ]
  return gulp.src('./src/css/*.css')
             .pipe(postcss(plugins))
             .pipe(gulp.dest('./src/css'))
})
