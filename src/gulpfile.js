var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    sequence = require('gulp-sequence');

gulp.task('default',sequence(
    'gulp_clean',
    'gulp_controllers_uglify',
    'gulp_models_uglify',
    'gulp_routes_uglify',
    'gulp_utilities_uglify',
    'gulp_views_copy',
    'gulp_test_copy',
    'gulp_public_biz_css_copy',
    'gulp_public_biz_imgs_copy',
    'gulp_public_biz_js_uglify',
    'gulp_public_framework_copy',
    'gulp_node_modules_copy',
    'gulp_main_file_uglify',
    'gulp_main_file_copy'
));

gulp.task('gulp_clean', function () {
    return gulp.src('../bin/app', {read: false})
        .pipe(clean({force:true}));
});

gulp.task('gulp_controllers_uglify', function () {
    return gulp.src('controllers/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../bin/app/controllers'));
});

gulp.task('gulp_models_uglify', function () {
    return gulp.src('models/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../bin/app/models'));
});

gulp.task('gulp_routes_uglify', function () {
    return gulp.src('routes/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../bin/app/routes'));
});

gulp.task('gulp_utilities_uglify', function () {
    return gulp.src('utilities/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../bin/app/utilities'));
});

gulp.task('gulp_views_copy', function () {
    return gulp.src('views/**/*')
        .pipe(gulp.dest('../bin/app/views'));
});

gulp.task('gulp_test_copy', function () {
    return gulp.src('test/**/*')
        .pipe(gulp.dest('../bin/app/test'));
});

gulp.task('gulp_public_biz_css_copy', function () {
    return gulp.src('public/biz/css/**/*')
        .pipe(gulp.dest('../bin/app/public/biz/css'));
});

gulp.task('gulp_public_biz_imgs_copy', function () {
    return gulp.src('public/biz/imgs/**/*')
        .pipe(gulp.dest('../bin/app/public/biz/imgs'));
});

gulp.task('gulp_public_biz_js_uglify', function () {
    return gulp.src('public/biz/js/**/*')
        .pipe(uglify({
            mangle: {
                except: [
                    '$scope',
                    '$http',
                    '$modal',
                    '$log',
                    '$modalInstance',
                    'contactCreationOrEditFactory',
                    'contactCreationOrEditFactory',
                    'editableContact'
                ]
            }
        }))
        .pipe(gulp.dest('../bin/app/public/biz/js'));
});

gulp.task('gulp_public_framework_copy', function () {
    return gulp.src('public/framework/**/*')
        .pipe(gulp.dest('../bin/app/public/framework'));
});

gulp.task('gulp_node_modules_copy', function () {
    return gulp.src('node_modules/**/*')
        .pipe(gulp.dest('../bin/app/node_modules'));
});

gulp.task('gulp_main_file_uglify', function () {
    return gulp.src(['app.js', 'www'])
        .pipe(uglify())
        .pipe(gulp.dest('../bin/app'));
});

gulp.task('gulp_main_file_copy', function () {
    return gulp.src(['package.json'])
        .pipe(gulp.dest('../bin/app'));
});
