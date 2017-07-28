var gulp = require('gulp'),
    sync = require('browser-sync'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    mincss = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    pug = require('gulp-pug'),
    reload = sync.reload;

/**
 * run gulp watch dev server
 */
gulp.task('default', ['framework', 'pug'], function () {
    sync.init({
        server: {
            baseDir: './dist'
        }
    });
})

/**
 * pug compilation task
 */
gulp.task('pug', function () {
    gulp.src('./pug/')
        .pipe(pug())
        .pipe(gulp.dest('./dist/'))
        .pipe(reload())
});

gulp.task('less', function () {

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

});