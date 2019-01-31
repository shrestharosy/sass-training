var gulp = require("gulp");
var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var sourcemaps = require("gulp-sourcemaps");
var connect = require("gulp-connect");
const autoprefixer = require("gulp-autoprefixer");

var paths = {
  styles: {
    src: "assets/sass/*.scss",
    dest: "dest"
  },
  watchedFiles: ["assets/sass/*.scss", "assets/sass/**/*.scss"]
};

function style() {
  return (
    gulp
      .src(paths.styles.src)
      //initialize sourcemaps before compilation starts
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(
        autoprefixer({
          browsers: ["last 2 versions"],
          cascade: false
        })
      )
      // Use postcss with autoprefixer and compress the compiled file using cssnano
      .pipe(cssnano())
      // Now add/write the sourcemaps
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(connect.reload())
  );
}

function watch() {
  connect.server({
    livereload: true,
    port: 3002
  });

  style();

  gulp.watch(paths.watchedFiles, style);
}

function defaultTask() {
  watch();
}

exports.style = style;
exports.watch = watch;
exports.default = defaultTask;
