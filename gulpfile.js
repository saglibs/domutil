var gulp = require('gulp');
var gulpTask = require('coreutil/gulptask');

gulp.task('default', function () {
    return gulpTask(['./dom.js', './domutils.js'], [], "./dist");
});