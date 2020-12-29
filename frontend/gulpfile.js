const {task} = require('gulp');
const {src, dest, series} = require('gulp');
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const purgecss = require('gulp-purgecss');
const useref = require('gulp-useref');
const replace = require('gulp-replace');

/*---------CONFIGURACIÓN PARA CAMBIAR LAS VARIABLES A DEV O PROD---------
const {CONFIGURATION} = require('./src/app.config.js');
const {API_URL, PORT} = CONFIGURATION;

require('dotenv').config();

task('build', function build() {
  const environmentPath =
    process.env.ENV_TYPE === 'prod' ? 'configurations/.env.prod' : 'configurations/.env.dev';

  require('dotenv').config({path: environmentPath});

  return src(['src/app.config.js'])
    .pipe(replace(API_URL, process.env.API_URL))
    .pipe(replace(PORT, process.env.PORT))
    .pipe(dest('src'));
});
-------------------------------------------------------------------------*/

function bundle() {
  return src('src/*.html').pipe(useref()).pipe(dest('bundle'));
}

function copyData() {
  return src('src/*.json').pipe(dest('bundle'));
}

function resizeImage() {
  return src('src/assets/images/*').pipe(imagemin()).pipe(dest('bundle/assets/images'));
}

function minifyJs() {
  return src('bundle/**/*.js').pipe(uglify()).pipe(dest('bundle'));
}

function minifyHtml() {
  return src('bundle/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(dest('bundle'));
}

function minifyCSS() {
  return src('bundle/**/*.css').pipe(cssmin()).pipe(dest('bundle'));
}

function autoPrefixerCSS() {
  return src('bundle/**/*.css')
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(dest('bundle'));
}

function cleanCss() {
  return src('bundle/**/*.css')
    .pipe(
      purgecss({
        content: ['bundle/*.html'],
      }),
    )
    .pipe(dest('bundle'));
}

exports.default = series(
  bundle,
  copyData,
  resizeImage,
  minifyJs,
  minifyHtml,
  minifyCSS,
  autoPrefixerCSS,
  cleanCss,
);
