//通过node安装了gulp模块
//通过require方法引入（加载）gulp模块，赋值给一个常量gulp
const gulp = require("gulp");

const sass = require("gulp-sass");

const sourcemaps = require('gulp-sourcemaps');

const connect = require("gulp-connect");

const concat = require("gulp-concat");

const uglify = require("gulp-uglify");

const rename = require("gulp-rename");

const cleanCss = require("gulp-clean-css");

const babel = require("gulp-babel");

//创建任务task("任务名","该任务具体的功能") 
gulp.task("hello",function(){
	console.log("hello world");
});

//拷贝文件 通常会建立一个dist文件夹（目录）存放拷贝的文件
gulp.task("copy-index",function(){
	//src找到要处理的文件，dest拷贝的存放位置
	gulp.src("index.html").pipe(gulp.dest("dist")).pipe(connect.reload());
});
gulp.task("copy-html",function(){
	//src找到要处理的文件，dest拷贝的存放位置
	gulp.src("html/*.html").pipe(gulp.dest("dist/html")).pipe(connect.reload());
});

gulp.task("copy-all",function(){
	gulp.src("imgs/**").
	pipe(gulp.dest("dist/imgs"));
});
//将多个文件夹下的文件拷贝到同一文件夹下
/*gulp.task('data',function(){
	//不同目录（路径）
	gulp.src(["xml/*.xml","json/*.json"]).pipe(gulp.dest("dist/data"));
});*/

/*gulp.task("default",["copy-index","copy-all","data"],function(){
	console.log("success");
});
*/
gulp.task('copy-js',function(){
	gulp.src("js/**").pipe(gulp.dest("dist/js"));
});


gulp.task("sass",function(){
	gulp.src("sass/**")
	.pipe(sourcemaps.init())
	.pipe(sass())
	      //cleanCss()
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css")).pipe(connect.reload());
});
gulp.task("copy-fontPic",function(){
	gulp.src("fontPic/**")
	.pipe(gulp.dest("dist/fontPic"));
});

gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true
		});
});


gulp.task("concat",function(){
	gulp.src(["js/a.js","js/b.js"])
	.pipe(concat("a_b.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename("a_b.min.js"))
	.pipe(gulp.dest("dist/js"));
});
gulp.task("babel",function(){
	gulp.src("js/*.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("dist/js"));
});

gulp.task("watch",function(){
	gulp.watch("index.html",["copy-index"]);
	gulp.watch("html/*.html",["copy-html"]);
	gulp.watch("imgs/**",["copy-all"]);
	gulp.watch("js/**",["copy-js"]);
	gulp.watch("sass/**",["sass"]);
	gulp.watch("fontPic/**",["copy-fontPic"]);
});

gulp.task("default",["server","watch"]);





