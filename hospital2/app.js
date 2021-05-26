var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs=require('ejs')
let session=require('express-session');
let multer=require('multer')
let upload=multer({dest:'./public/upload'})
var indexRouter = require('./routes/index');

//引入后台路由
var adminRouter=require('./routes/admin/adminRouter')
var loginRouter=require('./routes/login/loginRouter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html',ejs.__express);//注册html模板引擎
//配置session
app.use(session({
  secret:'jnhqdkjnsaj',
  resave:false,//强制保存
  cookie:{
    maxAge:7*24*60*1000000,
  },
  saveUninitialized:true//保存初始化的session
}))

app.use(logger('dev'));
app.use(express.json());
//解析post提交的数据
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//前台路由
app.use('/', indexRouter);
//后台路由

app.use('/admin',adminRouter);
app.use('/enter',loginRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
