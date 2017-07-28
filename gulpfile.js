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
gulp.task('default', function () {
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

gulp.task('framework-prepare');