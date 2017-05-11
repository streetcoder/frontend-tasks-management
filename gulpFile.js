var gulp 			= require('gulp');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var uglify          = require('gulp-uglify');
var concat 			= require('gulp-concat');
var jshint          = require('gulp-jshint');
var gutil           = require('gulp-util');
var imagemin        = require('gulp-imagemin');
var browserSync     = require('browser-sync').create();



gulp.task('sass', function(callback){
    return gulp.src('src/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('lint', function() {
    gulp.src('src/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['lint'],function()
{
    return gulp.src(['bower_components/jquery/dist/jquery.js',
        'bower_components/moment/moment.js',
        'src/scripts/custom.js'])
        .pipe(concat('main.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src(paths.img)
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
        }))
        .pipe(gulp.dest(paths.dist + '/images'));
});

gulp.task('watch', function () {

    browserSync.init({
        proxy: "task-management-workshop.dev"
    });
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['sass','scripts']);