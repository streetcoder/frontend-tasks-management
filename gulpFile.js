var gulp 			= require('gulp');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var browserSync     = require('browser-sync').create();



gulp.task('sass', function(callback){
    return gulp.src('src/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {

    browserSync.init({
        proxy: "task-management-workshop.dev"
    });
    gulp.watch('src/sass/**/*.scss', ['sass']);
});


gulp.task('default', ['sass']);