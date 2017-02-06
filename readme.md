# gulp-simple-gallery

Very simple static HTML image gallery generator, based on files in a folder and super simple templating.

Point it to an HTML file containing your "master layout". It'll then look for `images.html` in the same folder, and merge the two together based on images found in the `images` folder, also located at the same level.

- In the index/master layout file, use `{{images}}` to tell it where to repeat items for every image found.
- In `images.html`, use `{{imgsrc}}` to insert the path to the image (relative to the index file).

Take a look at [this example app](https://github.com/ArveSystad/gulp-simple-gallery/tree/master/sample-app) to see it in action.

## Examples

Basic usage: just pipe the index file through `gallery()`.

    gulp.task('createGalleryIndex', function() {
        return gulp.src('index.html')
                .pipe(gallery())
                .pipe(gulp.dest("dist"));
    });