var del = require('del')
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
  return del(['work/**', 'public/**']);
});

gulp.task('data', function () {
  var result = gulp.src('src/data/**/*.json');
  if (gutil.env.type === 'prod') {
    result = result.pipe(jsonminify());
  }
  return result.pipe(gulp.dest('work/data'));
});

gulp.task('html', ['data', 'libcss', 'libjs'], function () {
  if (gutil.env.type === 'prod') {
    var libs = gulp.src([
          'public/libs/**/*.min.js',
          'public/app.min.js'
        ]);
  } else {
    libs = gulp.src([
          'public/css/**/*.css',
          'public/libs/**/*.js',
          'public/js/**/*.js',
          '!public/libs/**/*.min.css',
          '!public/libs/**/*.min.js'
        ]);
  }
  libs = libs.pipe(sort({asc: false}));
  var result = gulp.src('src/index.html')
        .pipe(gulp.dest('work'))
        .pipe(include())
        .pipe(inject(libs, {addRootSlash: false, ignorePath: 'public'}))
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
  var result = gulp.src('src/**/*.js');
  if (gutil.env.type === 'prod') {
    result = result
      .pipe(sort({asc: false}))
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

gulp.task('libjs', function () {
  var result = gulp.src([
      'bower_components/**/*.js',
      'bower_components/**/*.map',
      '!bower_components/**/index.js',
      '!bower_components/moment/**/*', // no bower.json - expicit list below
      '!bower_components/**/ui-bootstrap.*', // using tpls version
      '!bower_components/**/demo-app.js'
    ]);
  result = merge(result, gulp.src([
      'bower_components/moment/min/moment.min.js',
      'bower_components/moment/moment.js'
    ]));
  return result
    .pipe(gulp.dest('public/libs'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.json', ['data', 'html']);
    gulp.watch('src/**/*.js', ['js']);
});

gulp.task('webserver', ['js', 'html'], function() {
  connect.server({ root: 'public' });
});

gulp.task('default', ['watch', 'webserver'], function() {
  // place code for your default task here
});
