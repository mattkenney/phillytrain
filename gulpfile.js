var cdn = require('gulp-inject-cdn')
,   del = require('del')
,   gulp = require('gulp')
,   gutil = require('gulp-util')
,   concat = require('gulp-concat')
,   connect = require('gulp-connect')
,   cssImport = require('gulp-cssimport')
,   include = require("gulp-include")
,   inject = require('gulp-inject')
,   jsonminify = require('gulp-jsonminify')
,   merge = require('merge-stream')
,   minimize = require('gulp-minify-html')
,   sort = require('gulp-sort')
,   uglify = require('gulp-uglify')
;

gulp.task('clean', function () {
  del.sync(['work/**', 'public/**']);
});

gulp.task('data', function () {
  var result = gulp.src('src/data/**/*.json');
  if (gutil.env.type === 'prod') {
    result = result.pipe(jsonminify());
  }
  return result.pipe(gulp.dest('work/data'));
});

gulp.task('html', ['data', 'js', 'libcss'], function () {
  if (gutil.env.type === 'prod') {
    var libs = gulp.src('public/app.min.js', {read: false});
  } else {
    libs = gulp.src([
          'public/**/*.css',
          'public/**/*.js',
          '!public/js/app.js',
          '!public/**/*.min.js',
          '!public/**/*.min.css'
        ], {read: false}).pipe(sort());
    libs = merge(gulp.src('public/js/app.js', {read: false}), libs);
  }
  var result = gulp.src('src/index.html')
        .pipe(gulp.dest('work'))
        .pipe(include())
        .pipe(inject(libs, {addRootSlash: false, ignorePath: 'public'}))
        .pipe(cdn('cdn.json', {
          nomin: (gutil.env.type !== 'prod'),
          scheme: 'https'
        }))
  ;
  result = merge(result, gulp.src(['src/**/*.html', '!src/index.html']));
  if (gutil.env.type === 'prod') {
    result = result
      .pipe(minimize({
        conditionals: true,
        empty: true
      }))
      ;
  }
  return result.pipe(gulp.dest('public'));
});

gulp.task('js', function () {
  var result = gulp.src(['src/**/*.js', '!src/js/app.js'])
    .pipe(sort())
  ;
  result = merge(gulp.src('src/**/js/app.js'), result);
  if (gutil.env.type === 'prod') {
    result = result
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      ;
  }
  return result.pipe(gulp.dest('public'));
});

gulp.task('libcss', function () {
  del.sync(['work/libs/**/*.css', 'public/css']);
  if (gutil.env.type === 'prod') {
    return gulp.src('libs/**/*.min.css')
      .pipe(cssImport({}))
      .pipe(gulp.dest('work/libs'))
      ;
  }
  return gulp.src(['libs/**/*.css', '!libs/**/*.min.css'])
    .pipe(gulp.dest('public/css'))
    ;
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*.html', 'src/**/*.js', 'src/**/*.json'], ['html']);
});

gulp.task('webserver', ['html'], function() {
  connect.server({ root: 'public' });
});

gulp.task('default', ['clean', 'watch', 'webserver'], function() {});
