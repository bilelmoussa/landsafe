const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const imagemin    = require("gulp-imagemin");
const concat      = require('gulp-concat');
const uglify      = require('gulp-uglify');
const babel       = require('gulp-babel');

gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
  });

gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss',
                    'node_modules/slick-carousel/slick/slick.scss',
                    'node_modules/slick-carousel/slick/slick-theme.scss',
                    'node_modules/intl-tel-input/src/css/intlTelInput.scss',
                     'src/sass/*.scss',
                    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
        
});

gulp.task('imageMin', () =>
        gulp.src(['node_modules/intl-tel-input/build/img/flags.png',
                    'node_modules/intl-tel-input/build/img/flags@2x.png',
                    'src/images/*'
                ])
		.pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream())
);

gulp.task('ajax_img', ()=>
    gulp.src("node_modules/slick-carousel/slick/ajax-loader.gif")
    .pipe(imagemin())
    .pipe(gulp.dest('dist/css'))
);

gulp.task("alljs", ()=>{
    gulp.src(["node_modules/jquery/dist/jquery.min.js", 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'node_modules/intl-tel-input/build/js/intlTelInput.min.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
})


gulp.task('mainJs' ,function(){
   return gulp.src(['src/js/*.js',])
   .pipe(babel({
    presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {

    browserSync.init({
        server: "./dist"  
    });

    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['mainJs']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch("src/*.html", ["copyHtml"]).on("change",  browserSync.reload)
});

gulp.task('default',["serve", "imageMin", "sass", "copyHtml", "mainJs", "alljs", "ajax_img"])
