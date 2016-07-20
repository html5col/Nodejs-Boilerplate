"use strict";
var express = require('express');
var bodyParser = require('body-parser');//to get the info of the form submit , you need to use req.body, which must require the body-parser middleware first

var app = express();
app.set('port',process.env.PORT || 8000);
app.set('env','development');

//express-handlebar
var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
//This view engine adds back the concept of "layout", which was removed in Express 3.x. It can be configured with a path to the layouts directory, by default it's set to "views/layouts/".
//This view engine adds back the concept of "layout", which was removed in Express 3.x. It can be configured with a path to the layouts directory, by default it's set to "views/layouts/".
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
//static中间件可以将一个或多个目录指派为包含静态资源的目录,其中资源不经过任何特殊处理直接发送到客户端,如可放img,css。 设置成功后可以直接指向、img/logo.png,static中间件会返回这个文件并正确设定内容类型


app.use(function(req,res,next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});
//我们不希望测试一直进行，只在需要测试时显示，我们准备用用一些中间件在检测查询字符串中的test=1,它必须出现在我们所有路由前

//routes
require('./routes/route.js')(app);

//customize 404 page using middleware
app.use(function(req,res,next){
    res.status(404);
    res.render('errors/404');
});

//customize 505 page using middleware
app.use(function(err,req,res,next){
    console.error(err.stack);
    // res.status(500);
    // res.render('errors/500');
    res.status(500).render('errors/500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port' + ';press Ctrl-C to terminate'));
});