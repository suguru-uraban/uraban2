'use strict';

// プラグイン読み込み
var gulp = require('gulp'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-ruby-sass'),
    pleeease = require('gulp-pleeease'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ts = require('gulp-typescript'),
    tsify = require('tsify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    runSequence = require('run-sequence'),
    spritesmith = require('gulp.spritesmith'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    webserver = require('gulp-webserver'),
    glob = require('glob');

// パスの設定
var path = {
    root: 'dist/',
    src: 'src/',
    sass: 'src/sass/',
    css: 'src/css/',
    cssmin: 'dist/css/',
    ts: 'src/ts/',
    jsmin: 'dist/js/',
    img: 'src/img/',
    imgmin: 'dist/img/',
    sprite: 'src/img/sprite/',
    tmp: 'src/tmp/'
}

//------------------------------------------------------
// 削除処理
//------------------------------------------------------
//一時ファイルの削除
gulp.task("clean", function () {
    del([path.tmp]);
});

//------------------------------------------------------
// HTMLの処理
//------------------------------------------------------
gulp.task('html', function() {
    return gulp.src(path.src + "**/*.html")
    .pipe(plumber())
    .pipe(gulp.dest(path.root))
});

//------------------------------------------------------
// CSSの処理
//------------------------------------------------------
//Sass
gulp.task('sass', function() {
    return sass(path.sass + '**/*.scss',{
        style : 'expanded',
        'sourcemap=none': true,
        compass: false
    })
    .pipe(plumber())
    .pipe(pleeease({
        autoprefixer: {
            'browsers': ['last 4 versions', 'Firefox ESR', 'ie 8', 'Safari 4', 'Android 2.3', 'iOS 4']
        },
        rem: ['10px'],
        minifier: false,
        mqpacker: true
    }))
    .pipe(gulp.dest(path.css));
});

// CSS圧縮
gulp.task('cssmin', function () {
    return gulp.src(path.css + '**/*.css')
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(path.cssmin));
});

// CSSの処理をまとめる
gulp.task('css', function(callback) {
    console.log('--------- CSSを処理します ----------');
    return runSequence('sass','cssmin',callback);
});

//------------------------------------------------------
// React+TypeScriptの処理
//------------------------------------------------------
// TypeScriptを処理
gulp.task('ts', function() {
    var project = ts.createProject('tsconfig.json', { declaration: false });
    return project.src()
    .pipe(plumber())
    .pipe(project())
    .pipe(gulp.dest(path.tmp));
});

// Reactをrequire
gulp.task('browserify', function(){
    return browserify(path.tmp + 'bundle.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(path.jsmin));
});

// JavaScriptの処理をまとめる
gulp.task('js', function(callback) {
    console.log('--------- JavaScriptを処理します ----------');
    return runSequence('ts','browserify','clean',callback);
});

//------------------------------------------------------
// 画像の処理
//------------------------------------------------------
// 画像圧縮
gulp.task('imagemin', function() {
    return gulp.src([path.img + '**/*.+(jpg|jpeg|png|gif|svg)','!' + path.sprite + '**/*.png'])
    .pipe(plumber())
    .pipe(imagemin({
        progressive: true,
        use: [pngquant({quality: '65-80', speed: 1})]
    }))
    .pipe(gulp.dest(path.imgmin));
});

// 画像の処理をまとめる
gulp.task('img', function(callback) {
    console.log('--------- 画像を処理します ----------');
    return runSequence('imagemin',callback);
});

//------------------------------------------------------
// スプライトの処理
//------------------------------------------------------
gulp.task('spriteBuild', function () {
    var spriteData = gulp.src(path.sprite + '**/*.png')
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        imgPath: '../img/sprite.png',
        cssFormat: 'scss',
        cssOpts: {
            functions: false
        },
        cssVarMap: function (sprite) {
            sprite.name = 'sprite-' + sprite.name;
        }
    }));
    spriteData.img.pipe(gulp.dest(path.img));
    spriteData.css.pipe(gulp.dest(path.sass));
});

// スプライトの処理をまとめる
gulp.task('sprite', function(callback) {
    console.log('--------- 画像を処理します ----------');
    return runSequence('spriteBuild','sass',['cssmin','imagemin'],callback);
});

//------------------------------------------------------
// タスクの監視
//------------------------------------------------------
// 監視
gulp.task('watch', function() {
    gulp.watch((path.src + '**/*.html'), ['html']);
    gulp.watch((path.sass + '**/*.scss'), ['css']);
    gulp.watch((path.ts + '**/*.tsx'), ['js']);
    gulp.watch((path.img + '**/*.+(jpg|jpeg|png|gif|svg)'), ['img']);
    gulp.watch((path.sprite + '**/*.png'), ['sprite']);
});

// Webサーバーの起動
gulp.task('webserver', function() {
    gulp.src(path.root)
        .pipe(webserver({
            host: '127.0.0.1',
            livereload: true
        })
    );
});

// プロダクト用
gulp.task('apply-prod-environment', function() {
    process.env.NODE_ENV = 'production';
});

// タスクの実行
gulp.task('default', ['apply-prod-environment','watch','webserver']);
