var gulp = require('gulp'),
    sync = require('browser-sync'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    mincss = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    pug = require('gulp-pug'),
    notify = require('gulp-notify'),
    babel = require('gulp-babel'),
    reload = sync.reload;

/**
 * run gulp watch dev server
 */
gulp.task('default', ['framework-prepare', 'pug', 'img', 'fonts'], function () {
    sync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('./src/less/**/*less', ['less']);
    gulp.watch('./src/pug/**/*.pug', ['pug']);
    gulp.watch('./src/img/**/*.{svg, jpg, png, gif, jpeg}', ['img']);
})

/**
 * pug compilation task
 */
gulp.task('pug', function () {
    gulp.src('./src/pug/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .on('error', notify.onError(function (err) {
            return "Pug: " + err;
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({
            stream: true
        }))
});

/**
 * less compilation task
 */
gulp.task('less', function () {
    gulp.src('./src/less/main.less')
        .pipe(less())
        .on('error', notify.onError(function (err) {
            return 'Less: ' + err;
        }))
        .pipe(mincss())
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({
            stream: true
        }))
});

/**
 * Copy all bootstrap and\or other framework or grid files to dist
 */
gulp.task('framework-prepare', function () {
    // copy bootstrap styles file
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('./dist/css'));
    // copy fonts
    gulp.src('./node_modules/bootstrap/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));

    // copy javascript file
    gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('./dist/js'));

    // copy jquery
    gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist/js'));

    // font awesome prepare
    gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('./dist/css'));
    gulp.src(('node_modules/font-awesome/fonts/**/*'))
        .pipe(gulp.dest('./dist/fonts'));

});


/**
 * compile js or other to readeable in all browsers js
 */
gulp.task('js', function () {
    // todo: listen js
    gulp.src('./src/js/app.js')
        .pipe(babel())
        .on('error', notify.onError(function (err) {
            return "Js: " + err;
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({
            stream: true
        }))
});

/**
 * images
 */
gulp.task('img', function () {
    gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('fonts', function () {
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
});