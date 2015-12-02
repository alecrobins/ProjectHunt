var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var path = require('path');

var production = process.env.NODE_ENV === 'production';

var dependencies = [
  'alt',
  'react',
  'react-dom',
  'react-router',
  'underscore'
];

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
  ]).pipe($.concat('vendor.js'))
    .pipe($.if(production, $.uglify({ mangle: false })))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe($.if(production, $.streamify($.uglify({ mangle: false }))))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify', ['browserify-vendor'], function() {
  return browserify('app/main.js')
    .external(dependencies)
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe($.if(production, $.streamify($.uglify({ mangle: false }))))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-watch', ['browserify-vendor'], function() {
  var bundler = watchify(browserify('app/main.js', watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify, { presets: ['es2015', 'react'] })
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function(err) {
        $.util.log($.util.colors.red(err.toString()));
      })
      .on('end', function() {
        $.util.log($.util.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public/js/'));
  }
});

/*
 |--------------------------------------------------------------------------
 | Compile the sass into a single file
 |--------------------------------------------------------------------------
 */
 //gulp.task('compass', function() {
  //var stylesheets = ['app/stylesheets/**/*'];

  // Compile Scss
 // return gulp.src(stylesheets)
   // .pipe($.changed('public/css', {
     // extension: '.css'
   // }))
    //.pipe($.compass({
     // project: path.join(__dirname, 'app/stylesheets/'),
      //css: 'public/css',
      //sass: path.join(__dirname, 'app/stylesheets/'),
    //}))
    //.pipe($.size({
      //title: 'assets'
    //}))
//});

//gulp.task('watch', function() {
  //gulp.watch('app/stylesheets/**/*', ['compass']);
//});

gulp.task('default', ['vendor', 'browserify-watch']); // compass, 'watch'
gulp.task('build', ['vendor', 'browserify']); // compass
