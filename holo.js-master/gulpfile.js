var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var jsFiles = 'src/**/*.js',
    jsDest = 'build';

gulp.task('holo', function () {
    return watch(jsFiles, function () {
        gulp.src(jsFiles)
            .pipe(concat('holo.js'))
            .pipe(gulp.dest(jsDest))
            .pipe(rename('holo.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(jsDest));
    });
});