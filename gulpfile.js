var gulp = require('gulp');

var sass = require('gulp-sass');

var minCss = require('gulp-clean-css');

var uglify = require('gulp-uglify');

//起服务   gulp-webserver

var server = require('gulp-webserver');

var url = require('url');

var fs = require('fs');

var path = require('path');

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

//压缩js

gulp.task('minJs', function() {
    return gulp.src(['./src/js/**/*.js', '!./src/js/libs/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('build'))
})


gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090, //配置端口
            middleware: function(req, res, next) { //拦截前端请求
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return
                }

                console.log(pathname);

                pathname = pathname === '/' ? '/index.html' : pathname;

                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))

            }
        }))
})

//整合任务
gulp.task('dev', gulp.series('devCss', 'minJs', 'devServer', 'watch'))