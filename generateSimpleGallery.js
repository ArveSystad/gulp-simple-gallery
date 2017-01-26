const through = require('through2');
const gutil = require('gulp-util');
const fs = require('fs');
const Vinyl = require('vinyl');
const PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-generateSimpleGallery';

function generateSimpleGallery() {
    let self,
        basePath,
        builtImagesListString = new String(),
        galleryItemTemplate,
        indexFileContent,
        finalCallback,
        initialFile;

    const transform = function (file, enc, callback) {
        basePath = file.base;
        self = this;

        fs.readFile(file.path, "utf-8", buildGallery);
        initialFile = file;
        finalCallback = callback;
    };

    const buildGallery = function (error, data) {
        indexFileContent = data;
        fs.readFile(basePath + "image.html", "utf-8", buildGalleryItems);
    }

    const buildGalleryItems = function (error, data) {
        galleryItemTemplate = data;
        fs.readdir(basePath + "images", "utf-8", buildImageItems);
    };

    const buildImageItems = function (error, files) {
        files.forEach(x => {
            builtImagesListString += galleryItemTemplate.replace("{{imgsrc}}", "images/" + x)
        });

        let fixedIndexFile = indexFileContent.replace("{{images}}", builtImagesListString);
        var modifiedFile = new Vinyl({
            path: "index.html",
            contents: new Buffer(fixedIndexFile)
        });

        self.push(modifiedFile);

        finalCallback(null, initialFile);
    };

    return through.obj(transform);
}

module.exports = generateSimpleGallery;