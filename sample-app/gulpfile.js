const gulp = require('gulp');
const clean = require('gulp-clean');
const changed = require('gulp-changed');
const gallery = require('./../index');

const DEST = "dist";
const IMAGEDEST = DEST + "/images";

gulp.task('clean:html', function() {
    return gulp.src('dist/*.html')
               .pipe(clean());
});

gulp.task('createGalleryIndex', ['clean:html', 'copyImages'], function() {
    return gulp.src('index.html')
               .pipe(gallery())
               .pipe(gulp.dest(DEST));
});

gulp.task('copyImages', function() {
    return gulp.src('images/**')
               .pipe(changed(IMAGEDEST))
               .pipe(gulp.dest(IMAGEDEST));
});

gulp.task('build', ['clean:html', 'createGalleryIndex'], function() {
    
});