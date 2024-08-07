// Initialize modules
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();
// https://www.toptal.com/javascript/optimize-js-and-css-with-gulp
// Use dart-sass for @use
//sass.compiler = require('dart-sass');

// Sass Task
function scssTask() {
  return src("app/scss/main.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("dist", { sourcemaps: "." }));
}

// JavaScript Task
function jsTask() {
  return src("app/js/1.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: "." }));
}


// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}


function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("*.html", browserSyncReload);
  watch(
    ["app/scss/**/*.scss", "app/**/*.js"],
    series(scssTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);





// build css "OR" scss
// // Initialize modules
// const { src, dest, watch, series, parallel } = require("gulp");
// const sass = require("gulp-sass")(require("sass"));
// const postcss = require("gulp-postcss");
// const autoprefixer = require("autoprefixer");
// const cssnano = require("cssnano");
// const babel = require("gulp-babel");
// const terser = require("gulp-terser");
// const browsersync = require("browser-sync").create();

// // SCSS Task
// function scssTask() {
//   return src("app/scss/main.scss", { sourcemaps: true })
//     .pipe(sass().on('error', sass.logError))
//     .pipe(postcss([autoprefixer(), cssnano()]))
//     .pipe(dest("dist", { sourcemaps: "." }))
//     .pipe(browsersync.stream());
// }

// // CSS Task
// function cssTask() {
//   console.log('Processing CSS files...');
//   return src("app/css/main.css", { sourcemaps: true, allowEmpty: true })
//     .pipe(postcss([autoprefixer(), cssnano()]))
//     .pipe(dest("dist", { sourcemaps: "." }))
//     .pipe(browsersync.stream());
// }

// // JavaScript Task
// function jsTask() {
//   return src("app/js/1.js", { sourcemaps: true })
//     .pipe(babel({ presets: ["@babel/preset-env"] }))
//     .pipe(terser())
//     .pipe(dest("dist", { sourcemaps: "." }))
//     .pipe(browsersync.stream());
// }

// // Browsersync
// function browserSyncServe(cb) {
//   browsersync.init({
//     server: {
//       baseDir: ".",
//     },
//     notify: {
//       styles: {
//         top: "auto",
//         bottom: "0",
//       },
//     },
//   });
//   cb();
// }

// function browserSyncReload(cb) {
//   browsersync.reload();
//   cb();
// }

// // Watch Task
// function watchTask() {
//   watch("*.html", browserSyncReload);
//   watch("app/scss/**/*.scss", series(scssTask, browserSyncReload));
//   watch("app/css/**/*.css", series(cssTask, browserSyncReload));
//   watch("app/js/**/*.js", series(jsTask, browserSyncReload));
// }

// // Default Gulp Task
// exports.default = series(
//   parallel(scssTask, cssTask, jsTask),
//   browserSyncServe,
//   watchTask
// );
