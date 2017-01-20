'use strict'
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const jade = require('gulp-jade')
const serve = require('gulp-serve')
const spawnSync = require('child_process').spawnSync

gulp.task('serve', serve({
  hostname: 'localhost',
  port: 3099,
  root: './'
}))

gulp.task('js', () => {
  spawnSync('npm', ['run', 'build:js'], {stdio: 'inherit'})
})

gulp.task('css', () => {
  return gulp.src('./src/css/*.css')
    .pipe(postcss([
      require('postcss-cssnext')({
        browsers: ['last 2 versions', 'ie > 8']
      })
    ]))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('site'))
})

gulp.task('jade', () => {
  return gulp.src('./src/jade/index.jade')
    .pipe(jade({
      locals: {
        title: 'Native Toast',
        time: Date.now()
      }
    }))
    .pipe(gulp.dest('.'))
})

gulp.task('watch', () => {
  gulp.watch('./src/js/*.js', ['js'])
  gulp.watch('./src/css/*.css', ['css'])
  gulp.watch('./src/jade/*', ['jade'])
})

gulp.task('build', ['js', 'css', 'jade'])

gulp.task('default', ['build', 'watch', 'serve'])
