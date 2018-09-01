var gulp = require('gulp');

var sass = require('gulp-sass');

var minCss = require('gulp-clean-css');

//编译scss压缩css
gulp.task('devCss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
})

//监听scss

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devCss'))
})

//整合任务
gulp.task('dev', gulp.series('devCss', 'watch'))