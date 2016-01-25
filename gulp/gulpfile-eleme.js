var gulp = require('gulp');
var sort = require('gulp-sort');
var util = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin').bind(null, { collapseWhitespace: true });
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('run-sequence');
var usemin = require('gulp-usemin');
var babel = require('gulp-babel').bind(null, { compact: false });
var rev = require('gulp-rev');
var elint = require('./gulp-elint');
var lazyWatch = function(glob, task) {
  return function() {
    var tick;
    gulp.watch(glob, function() {
      if(tick) return;
      tick = setTimeout(function() {
        runSequence(task);
        tick = void 0;
      });
    });
  };
};

gulp.task('compile', function(done) {
  runSequence([
    'compile.css',
    'compile.controller',
    'compile.services',
    'compile.directives',
    'compile.app'
  ], done);
});
gulp.task('compile.css', function() {
  return gulp.src('./css/msite.scss').pipe(concat('eleme.css')).pipe(sass({ outputStyle: 'compressed' })).pipe(gulp.dest('dist'));
});
gulp.task('compile.controller', function() {
  return gulp.src('./js/controller/**/*.js').pipe(elint()).pipe(sort()).pipe(concat('eleme.controller.js')).pipe(babel()).pipe(gulp.dest('dist'));
});
gulp.task('compile.services', function() {
  return gulp.src('./js/services/**/*.js').pipe(elint()).pipe(sort()).pipe(concat('eleme.services.js')).pipe(babel()).pipe(gulp.dest('dist'));
});
gulp.task('compile.directives', function() {
  return gulp.src('./js/directives/**/*.js').pipe(elint()).pipe(sort()).pipe(concat('eleme.directives.js')).pipe(babel()).pipe(gulp.dest('dist'));
});
gulp.task('compile.app', function() {
  return gulp.src('./js/*.js').pipe(elint()).pipe(sort()).pipe(concat('eleme.app.js')).pipe(babel()).pipe(ngAnnotate()).pipe(gulp.dest('dist'));
});
gulp.task('copyimg', function(done) {
  return gulp.src('img/**/*').pipe(gulp.dest('dist/img'));
});

gulp.task('ml2js', function(done) {
  runSequence([
    'ml2js.html',
    'ml2js.svg'
  ], done);
});
gulp.task('ml2js.html', function() {
  return gulp.src('./html/**/*.html').pipe(sort()).pipe(htmlmin()).pipe(templateCache(
    'eleme.html.js', {
      module: 'meleme',
      base: function(e) {
        return e.history[0].slice(e.cwd.length);
      }
    }
  )).pipe(concat('eleme.html.js')).pipe(gulp.dest('dist'));
});

gulp.task('ml2js.svg', function() {
  return gulp.src('./svg-inline/**/*.svg').pipe(sort()).pipe(htmlmin()).pipe(templateCache(
    'eleme.svg.js', {
      module: 'meleme',
      base: function(e) {
        var path = e.history[0].slice(e.cwd.length);
        path = '/msite' + path;
        return path;
      }
    }
  )).pipe(concat('eleme.svg.js')).pipe(gulp.dest('dist'));
});

gulp.task('usemin', function() {
  return gulp.src('index.html').pipe(usemin({
    'libjs': [ concat('eleme.lib.min.js'), uglify(), rev() ],
    'js': [ concat('eleme.min.js'), ngAnnotate(), uglify(), rev() ],
    'css': [ concat('eleme.min.css'), minifyCss(), rev() ],
    'htmljs': [ concat('eleme.html.min.js'), uglify(), rev() ],
    'svgjs': [ concat('eleme.svg.min.js'), uglify(), rev() ],
    'crayfishjs': [ concat('eleme.crayfish.min.js'), uglify(), rev() ]
  })).pipe(gulp.dest('dist'));
});

gulp.task('copyindex', function() {
  var fs = require('fs');
  fs.writeFile('dist/eleme.html.js', "console.log('%cmsite: 开发模式不打包 html', 'color:#ccc');");
  fs.writeFile('dist/eleme.svg.js', "console.log('%cmsite: 开发模式不打包 svg', 'color:#ccc');");
  return gulp.src('index.html').pipe(gulp.dest('dist'));
});

gulp.task('watch.css', lazyWatch('./css/**/*.scss', 'compile.css'));
gulp.task('watch.controller', lazyWatch('./js/controller/**/*.js', 'compile.controller'));
gulp.task('watch.services', lazyWatch('./js/services/**/*.js', 'compile.services'));
gulp.task('watch.directives', lazyWatch('./js/directives/**/*.js', 'compile.directives'));
gulp.task('watch.svg', lazyWatch('./js/inline-svg/**/*.js', 'compile.svg'));
gulp.task('watch.app', lazyWatch('./js/*.js', 'compile.app'));

gulp.task('watch', function(done) {
  runSequence([
    'watch.css',
    'watch.svg',
    'watch.controller',
    'watch.services',
    'watch.directives',
    'watch.app'
  ]);
});

gulp.task('build', function(done) {
  runSequence('compile', 'copyindex', 'copyimg', done);
});

gulp.task('deploy', function(done) {
  runSequence('compile', 'ml2js', 'copyimg', 'usemin', done);
});

gulp.task('dev', [ 'build' ], function(done) {
  runSequence([ 'watch' ], done);
});

gulp.task('help', function() {
  setTimeout(function() {
    console.log('');
    console.log('=========== gulp 使用说明 ===========');
    console.log(' $ gulp help    # gulp 使用说明');
    console.log(' $ gulp build   # 生成文件');
    console.log(' $ gulp dev     # 进入一般开发环境');
    console.log(' $ gulp deploy  # 上线部署任务');
    console.log('=====================================');
  });
});

gulp.task('default', ['help']);

