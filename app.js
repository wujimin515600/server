var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var querystring = require('querystring');
const bodyparser = require('body-parser');
const request  = require('request');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const keyWord = require('./routes/weixin/keyword');
const wxLogin = require('./routes/weixin/login');
const ejs = require('ejs');
var app = express();
// 跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	if(req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
	else next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');    //app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/keyword',keyWord);
app.use('/wxLogin',wxLogin);
// app.use('/users', usersRouter);
/**
app.get('/', function(req, res){
		res.send('1');
	});
app.post('/getOpenid',function (req,res) {
		console.log('请求getOpenid')
		var data = '';
		req.on('data', function(chunk){
			data += chunk;
		});
		console.log('data',data)
		req.on('end', function(){
			data =  decodeURI(data);
			var dataObject = querystring.parse(data);
			console.log('querystring',dataObject);
			// var appid = 'wx92b479a29611eb29';
			// var secret = '8b307b24694381606f178357ca8c6a3d';
			var appid = 'wx92b479a29611eb29';
			var secret = 'a1414dab89b66db4a71615828f4ebaaf';
			var code = dataObject.code;
			console.log('code',code)
			var src = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';
			request(src, function(err, response, body){
				if(!err && response.statusCode == 200){
					if(body){
						// body = querystring.parse(body);
						body = eval("("+body+")")
						console.log(body)
						res.send(body);
					}		
				}else{
					res.send('请求失败')
				}
			})
		});
	});
*/
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
