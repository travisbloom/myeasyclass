var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var clean = require('gulp-clean');
var prefix = require('gulp-autoprefixer');
//var livereload = require('gulp-livereload');
var onError = function (err) {
    console.log('Gulp Error: ');
    console.log(err);
};
//compiles less
gulp.task('less', function() {
    return gulp.src('app/styles/main.less')
        .pipe(less())
        .on('error', onError)
        .pipe(prefix({ cascade: true }))
        .on('error', onError)
        .pipe(gulp.dest('dist'));
});

//compiles bower assets in to one js file
gulp.task('bower', function() {
    return gulp.src([
        'app/bower_components/parse/index.js',
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'app/bower_components/angular-animate/angular-animate.js',
        'app/bower_components/angular-strap/src/affix/affix.js',
        'app/bower_components/angular-strap/src/helpers/dimensions.js',
        'app/bower_components/angular-strap/src/helpers/debounce.js'
    ])
        .pipe(concat('packages.js'))
        .pipe(gulp.dest('dist'));
});

//compiles js in their proper dependency order. Once app.js is loaded, anything can follow because of Angular dependency injection
gulp.task('js', function() {
    return gulp.src([
        'app/scripts/secrets.js',
        'app/scripts/app.js',
        'app/scripts/**/*.js'
    ])
        .pipe(concat('app.js'))
        .on('error', onError)
        .pipe(gulp.dest('dist'));
});

//clean dist folder
gulp.task('clean-dist', function () {
    return gulp.src('dist/**/*.*', {read: false})
        .pipe(clean());
});
//pull bootstrap fonts in to image folder
gulp.task('images_fonts', function () {
    return gulp.src([
        'app/bower_components/bootstrap/fonts/*.*',
        'app/assets/*.*'
    ])

        .pipe(gulp.dest('dist/assets'));
});
//moves assets not touched by gulp to dist folder
gulp.task('move', function () {
    return gulp.src([
        'app/**/*.*',
        '!app/scripts/**/*.*',
        '!app/styles/**/*.*',
        '!app/bower_components/**/*.*'
    ])

    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean-dist', 'images_fonts', 'move', 'less', 'js', 'bower']);

//watch for changes and recompile
gulp.task('watch', ['build'], function () {
    gulp.watch('app/styles/**/*.less', ['less']);
    gulp.watch('app/scripts/**/*.js', ['js']);
    gulp.watch('app/templates/**/*.html', ['move']);
    gulp.watch('app/index.html', ['move']);
});


/**
 * Production Tasks
 * */
gulp.task('prod-js', function() {
    return gulp.src([
        'dist/packages.js',
        'dist/app.js'
    ])
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

 gulp.task('prod', ['build', 'prod-js']);
