const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');

return gulp.src(["./scripts/styles/index.css"])
.pipe(cleanCSS())
.pipe(gulp.dest("./static/dist"));