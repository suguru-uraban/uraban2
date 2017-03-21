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
    ts = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    runSequence = require('run-sequence'),
    spritesmith = require('gulp.spritesmith'),
    webserver = require('gulp-webserver');

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

//CSSファイルの削除
gulp.task("cssclean", function () {
    del([path.css + '*']);
});

//画像ファイルの削除
gulp.task("imgclean", function () {
    del([path.imgmin + '*']);
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
gulp.task('sass', function(){
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
    return runSequence('cssclean','sass','cssmin',callback);
});

//------------------------------------------------------
// JavaScriptの処理
//------------------------------------------------------
// TypeScriptの処理
gulp.task("ts", function() {
  let project = ts.createProject("tsconfig.json", { declaration: false });
  return project.src()
  .pipe(plumber())
  .pipe(project())
  .pipe(gulp.dest(path.jsmin));
});


// JavaScriptの処理をまとめる
gulp.task('js', function(callback) {
    console.log('--------- JavaScriptを処理します ----------');
    return runSequence('ts',callback);
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
    return runSequence('imgclean','imagemin',callback);
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
    return runSequence('imgclean','spriteBuild','sass',['cssmin','imagemin'],callback);
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

// タスクの実行
gulp.task('default', ['img','sprite','watch','webserver']);
