'use strict';

//npm run gulp <command>

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');

gulp.task("hello", function() {
	console.log("hello world");
});

gulp.task("hello2", function() {
	console.log("hello world two");
});

gulp.task("delay", function() {
	console.log('delay START');
	setTimeout(function () {
	  console.log('delay END')
	}, 1000)
});

//.start will change in v4
gulp.task("default", ["clean"], function() {
	gulp.start('buildDeploy');
});

gulp.task("concat", function() {
	gulp.src(['js/test1.js', 'js/test2.js', 'js/test3.js' ])
		.pipe(concat("app.js"))
		.pipe(gulp.dest("js"));
});

gulp.task("minify", function() {
	gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename("app.min.js"))
		.pipe(gulp.dest('js'));
});

//concurrent, may not execute in order
gulp.task('build', ['concat','minify','hello','hello2']);

//sequential, adding return statement means other tasks will wait for return value if they use it as a dependency
gulp.task("concat2", function() {
	return gulp.src(['js/test1.js', 'js/test2.js', 'js/test3.js' ])
		.pipe(concat("app.js"))
		.pipe(gulp.dest("js"));
});

//concat2 is dependency of minify2 so it needs to complete before running
gulp.task("minify2", ['concat2'], function() {
	return gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename("app.min.js"))
		.pipe(gulp.dest('js'));
});

gulp.task('build2', ['minify2']);

gulp.task('buildDeploy', ['build2'], function() {
	return gulp.src(['index.html', 'js/app.min.js'],{ base: './' })
					.pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
	del(['dist','js/app*.js']);
});

//---------------

gulp.task('fileChanged', function() {
	console.log("file changed");
});

gulp.task("watchFile", function() {
	gulp.watch(['index.html','package.json'],['fileChanged']);
});

