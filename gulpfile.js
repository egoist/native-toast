'use strict'
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const jade = require('gulp-jade')
const serve = require('gulp-serve')
const autoprefixer = require('gulp-autoprefixer')
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
  return gulp.src('./src/css/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist'))
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
  gulp.watch('./src/css/*.styl', ['css'])
  gulp.watch('./src/jade/*', ['jade'])
})

gulp.task('build', ['js', 'css', 'jade'])

gulp.task('default', ['build', 'watch', 'serve'])
