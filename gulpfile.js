'use strict';

var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    watch        = require('gulp-watch'),
    minCss       = require('gulp-minify-css'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat');

var path = {
    public: {
        css: 'public/css/',
        js: 'public/js/'
    },
    src: {
        sass: 'src/sass/main.scss',
        js: 'src/js/main.js'
    },
    watch: {
        sass: 'src/sass/**/*.scss',
        js: 'src/js/main.js'
    }
};

gulp.task('sass', function() {
    gulp.src([path.src.sass,
         'node_modules/slick-carousel/slick/slick-theme.scss', 
        'node_modules/slick-carousel/slick/slick.scss'])
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(gulp.dest(path.public.css));
});

gulp.task('js', function() {
   gulp.src(path.src.js)
       .pipe(uglify())
       .pipe(gulp.dest(path.public.js));
});

gulp.task('scripts', function() {
    gulp.src([ 
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/slick-carousel/slick/slick.min.js'])
        .pipe(concat('libs.min.js'))
        .pipe(uglify()) 
        .pipe(gulp.dest(path.public.js));
});

gulp.task('watch', function() {
    watch([path.watch.sass], function(event, cb) {
        gulp.start('sass');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
});

gulp.task('default', ['sass', 'scripts', 'js']);