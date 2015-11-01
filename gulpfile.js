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
,   replace = require('gulp-replace')
,   sourcemaps = require('gulp-sourcemaps')
,   sort = require('gulp-sort')
,   uglify = require('gulp-uglify')
;

function version(path) {
  if (!version.ts) {
    version.ts = new Date().toISOString().replace(/[^0-9A-Z]/g, '');
  }
  if (path) {
    path = String(path);
    if (path.charAt(0) === '!') {
      var segments = ['!public', version.ts, path.substring(1)];
    } else {
      segments = ['public', version.ts, path];
    }
  } else {
    segments = ['public', version.ts];
  }
  return segments.join('/');
}

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

gulp.task('html', ['data', 'js', 'libcss', 'partials', 'static'], function () {
  if (gutil.env.type === 'prod') {
    var libs = gulp.src(version('app.min.js'), {read: false});
  } else {
    libs = gulp.src([
          version('**/*.css'),
          version('**/*.js'),
          version('!js/app.js'),
          version('!**/*.min.js'),
          version('!**/*.min.css')
        ], {read: false}).pipe(sort());
    libs = merge(gulp.src(version('js/app.js'), {read: false}), libs);
  }
  var result = gulp.src('src/index.html')
        .pipe(gulp.dest('work'))
        .pipe(replace('@@version@@', version.ts))
        .pipe(include())
        .pipe(inject(libs, {addRootSlash: false, ignorePath: 'public'}))
        .pipe(cdn('cdn.json', {
          nomin: (gutil.env.type !== 'prod'),
          scheme: 'https'
        }))
  ;
  if (gutil.env.type === 'prod') {
    // minify html, but preserve the license comment by temporarily
    // making it a <pre>, and then back into a comment
    result = result
      .pipe(replace(/<!--(.|\n)*?-->/g, function (comment) {
        var m = (/<!--((.|\n)*?@license\b(.|\n)*?)-->/).exec(comment);
        if (m) {
          return '<pre>\n@licstart\n' + m[1] + '\n@licend\n</pre>';
        }
        return comment;
      }))
      .pipe(minimize({
        conditionals: true,
        empty: true
      }))
      .pipe(replace('<pre>\n@licstart\n', '\n<!--'))
      .pipe(replace('\n@licend\n</pre>', '-->\n'))
      ;
  }
  return result
    .pipe(gulp.dest('public'));
});

gulp.task('partials', ['version'], function () {
  var result = gulp.src('src/partials/**/*.html')
    .pipe(replace('@@version@@', version.ts))
  ;
  if (gutil.env.type === 'prod') {
    result = result
      .pipe(minimize({
        conditionals: true,
        empty: true
      }))
      ;
  }
  return result
    .pipe(gulp.dest(version('partials')));
});

gulp.task('static', function () {
  return gulp.src(['static/**/*.ico', 'static/**/*.png', 'static/**/*.svg',
      'static/**/*.txt'])
    .pipe(gulp.dest('public'))
    ;
});

gulp.task('js', ['version'], function () {
  var result = gulp.src(['src/**/*.js', '!src/js/app.js'])
    .pipe(sort())
  ;
  result = merge(gulp.src('src/**/js/app.js'), result);
  if (gutil.env.type === 'prod') {
    result = result
      .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      .pipe(uglify({
        preserveComments:'license'
      }))
      .pipe(sourcemaps.write('.'))
      ;
  }
  return result
    .pipe(replace('@@version@@', version.ts))
    .pipe(gulp.dest(version()));
});

gulp.task('libcss', ['version'], function () {
  if (gutil.env.type === 'prod') {
    return gulp.src('libs/**/*.min.css')
      .pipe(cssImport({}))
      .pipe(gulp.dest('work/libs'))
      ;
  }
  return gulp.src(['libs/**/*.css', '!libs/**/*.min.css'])
    .pipe(gulp.dest(version('css')))
    ;
})

gulp.task('version', function(cb) {
  del(version());
  version.ts = null;
  version();
  cb();
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*.html', 'src/**/*.js', 'src/**/*.json'], ['html']);
});

gulp.task('webserver', ['html'], function() {
  connect.server({ root: 'public' });
});

gulp.task('default', ['clean', 'watch', 'webserver'], function() {});
