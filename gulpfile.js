var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var clean = require('gulp-clean');
//prevent streams from crashing on failed concats/minifications, logs out the issue and continues watching
var plumber = require('gulp-plumber');
var onError = function (err) {
  console.log(err)
};
//compiles less
gulp.task('less', function() {
    return gulp.src('app/styles/main.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(less())
        .pipe(gulp.dest('dist'));
});

//compiles bower assets in to one js file
gulp.task('bower', function() {
    return gulp.src([
        'app/bower_components/angular/angular.js',
        'app/bower_components/parse/index.js'
    ])
        .pipe(concat('packages.js'))
//        .pipe(ngmin())
//        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

//compiles js in their proper dependency order. Once app.js is loaded, anything can follow because of Angular dependency injection
gulp.task('js', function() {
    return gulp.src([
        'app/scripts/app.js',
        'app/scripts/**/*.js'
    ])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('app.js'))
//        .pipe(ngmin())
//        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

//clean dist folder
gulp.task('clean-dist', function () {
    return gulp.src('dist/**/*.*', {read: false})
        .pipe(clean());
});

//moves assets not touched by gulp to dist folder
gulp.task('move', ['clean-dist'] ,function() {
    return gulp.src([
        'app/**/*.*',
        '!app/scripts/**/*.*',
        '!app/styles/**/*.*',
        '!app/bower_components/**/*.*'
    ])

    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['move', 'less', 'js', 'bower']);

//watch for changes and recompile
gulp.task('watch', ['less'], function () {
    gulp.watch('app/styles/**/*.less', ['less']);
    gulp.watch('app/scripts/*.js', ['js']);
    gulp.watch('app/bower_components/**/*.*', ['bower']);
});