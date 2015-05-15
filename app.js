var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var session = require("express-session");
var parseurl = require('parseurl');
var wechat = require("wechat");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
//app.use(session({
//    secret: 'keyboard cat',
//    resave: false,
//    saveUninitialized: true
//}));
//
//app.use(function (req, res, next) {
//    var views = req.session.views;
//    if (!views) {
//        views = req.session.views = {};
//    }
//    var pathname = parseurl(req).pathname;
//    views[pathname] = (views[pathname] || 0) + 1;
//    next();
//});

app.use('/', routes);
app.use('/users', users);

//for wechat
var config = require("./config");
app.use(express.query());

app.use('/wechat', wechat(config.mp).text(function (message, req, res) {
    console.log(message);
    res.reply({type: "text", content: "我还没有想好怎么跟你说！"});
}).image(function (message, req, res) {
    console.log(message);
    res.reply('还没想好图片怎么处理啦。');
}).location(function (message, req, res) {
    console.log(message);
    res.reply('想和我约会吗，不要的啦。妈妈会打屁股呢！');
}).voice(function (message, req, res) {
    console.log(message);
    res.reply('心情不好，不想搭理你。');
}).link(function (message, req, res) {
    console.log(message);
    res.reply('点连接进来的是吧！');
}).event(function (message, req, res) {
    console.log(message);
    if (message.Event === 'subscribe') {
        // 用户添加时候的消息
        res.reply('谢谢添加Spmgt123公共帐号:)\n回复相关关键词，将会得到相关信息。');
    } else if (message.Event === 'unsubscribe') {
        res.reply('Bye!');
    } else {
        res.reply('暂未支持! Coming soon!');
    }
}).middlewarify());


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
