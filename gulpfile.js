'use strict'
const gulp = require('gulp')
const rollup = require('gulp-rollup')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const jade = require('gulp-jade')
const serve = require('gulp-serve')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')

const rollupPlugins = [
  require('rollup-plugin-babel')({
    presets: ['es2015-rollup']
  })
]

gulp.task('serve', serve({
  hostname: 'localhost',
  port: 3099,
  root: './site'
}))

gulp.task('js:umd', () => {
  return gulp.src('./src/js/index.js')
    .pipe(sourcemaps.init())
    .pipe(rollup({
      format: 'umd',
      moduleName: 'nativeToast',
      plugins: rollupPlugins
    }))
    .pipe(rename('native-toast.umd.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('site'))
})

gulp.task('js:cjs', () => {
  return gulp.src('./src/js/index.js')
    .pipe(rollup({
      format: 'cjs',
      plugins: rollupPlugins
    }))
    .pipe(rename('native-toast.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('css', () => {
  return gulp.src('./src/css/native-toast.css')
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
    .pipe(gulp.dest('site'))
})

gulp.task('watch', () => {
  gulp.watch('./src/js/*.js', ['js:cjs', 'js:umd'])
  gulp.watch('./src/css/*.css', ['css'])
  gulp.watch('./src/jade/*', ['jade'])
})

gulp.task('build', ['js:cjs', 'js:umd', 'css', 'jade'])

gulp.task('default', ['build', 'watch', 'serve'])
