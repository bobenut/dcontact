var gulp = require('gulp'),
    uglify = require('gulp-uglify');

//gulp.task('default',[
//    'gulp_controllers_uglify_js',
//    'gulp_models_uglify_js',
//    'gulp_routes_uglify_js',
//    'gulp_utilities_uglify_js'
//]);

gulp.task('default',[
    'gulp_public_biz_js_uglify'
]);

gulp.task('gulp_controllers_uglify', function() {
    return gulp.src('controllers/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../bin/app/controllers'));
});

gulp.task('gulp_models_uglify', function() {
    return gulp.src('models/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../bin/app/models'));
});

gulp.task('gulp_routes_uglify', function() {
    return gulp.src('routes/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../bin/app/routes'));
});

gulp.task('gulp_utilities_uglify', function() {
    return gulp.src('utilities/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../bin/app/utilities'));
});

gulp.task('gulp_views_copy', function() {
    return gulp.src('views/**/*')
        .pipe(gulp.dest('../bin/app/views'));
});

gulp.task('gulp_public_biz_css_copy', function() {
    return gulp.src('public/biz/css/**/*')
        .pipe(gulp.dest('../bin/app/public/biz/css'));
});

gulp.task('gulp_public_biz_imgs_copy', function() {
    return gulp.src('public/biz/imgs/**/*')
        .pipe(gulp.dest('../bin/app/public/biz/imgs'));
});

gulp.task('gulp_public_biz_js_uglify', function() {
    return gulp.src('public/biz/js/**/*')
        .pipe(uglify({mangle: {except: ['$scope','$http','$modal','$log']}}))
        .pipe(gulp.dest('../bin/app/public/biz/js'));
});

gulp.task('gulp_public_framework_copy', function() {
    return gulp.src('public/framework/**/*')
        .pipe(gulp.dest('../bin/app/public/framework'));
});
