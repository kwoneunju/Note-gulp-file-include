var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    fileInclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create();

var src = './src',
    dist = './dist',
    path = {
        scss: src + '/scss/**/*.scss'
    }

gulp.task('html', function() {
    return gulp.src([src+'/html/*.html'], {base : './'})
    .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(dist+'/html'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('scss', function() {
    return gulp.src([src+'/scss/*/*.scss', src+'/scss/*.scss'])
    .pipe(concat('style.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dist+'/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('watch', function() {
    gulp.watch(['./*.html', src+'/html/*.html'], gulp.series('html'));
    gulp.watch(src+'/scss/*.scss', gulp.series('scss'));
});

gulp.task('browserSync', gulp.series('html', 'scss'), function() {
    return browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
})

gulp.task('default', gulp.series('browserSync', 'watch'));

// gulp.task('default', function() {
//     console.log('Hello World :)');
// });