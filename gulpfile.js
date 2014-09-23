var gulp = require('gulp');
var karma = require('karma').server;
var path = require('path');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var jsdoc = require('gulp-jsdoc');
var nodemon = require('gulp-nodemon');

var paths = {};
paths.stylesheets = ['src/scss/**/*.scss'];
paths.scripts = [
	'src/js/**/*.js'
];

gulp.task('docs', function () {
	return gulp.src(paths.scripts)
		.pipe(jsdoc.parser())
		.pipe(jsdoc.generator(path.join(__dirname, 'docs')));
});

gulp.task('scripts', ['docs'], function () {
	var dest = path.join(__dirname, 'dist');

	gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(sourcemaps.init())
			.pipe(concat('bash.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dest));
});

gulp.task('stylesheets', function () {
	var dest = path.join(__dirname, 'dist', 'css');

	return gulp.src(paths.stylesheets)
		.pipe(sass())
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min',
			basename: 'style',
			extname: '.css'
		}))
		.pipe(gulp.dest(dest));
});

gulp.task('test', function (done) {
	karma.start({
		singleRun: false,		
	}, done);
});

gulp.task('serve', function () {
	nodemon({
		script: 'app.js'
	});
});

gulp.task('watch', function () {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.stylesheets, ['stylesheets']);
});

gulp.task('default', ['scripts', 'stylesheets', 'watch', 'serve']);