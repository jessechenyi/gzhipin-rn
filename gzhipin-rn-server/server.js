const Koa=require('koa');
// const staticCache=require('koa-static-cache');
const body=require('koa-better-body');
const convert=require('koa-convert');
const session=require('koa-session');
const config=require('./config');
const Router=require('koa-router');
const pathlib=require('path');
const error=require('./libs/error_handler');
const loglib=require('./libs/log');
// const ejs=require('koa-ejs');
var indexRouter = require('./routes/index_koa');
var usersRouter = require('./routes/users_koa');

//连接数据库
// let db=require('./libs/db');

let server=new Koa();
server.listen(config.port);

//错误处理
error(server);
loglib(server);

// server.use(async (ctx, next)=>{
//   ctx.db=db;
//   await next();
// });

//post
// server.use(convert(body({
//   uploadDir: config.uploadDir
// })));

//session
server.keys=config.secret_key;
server.use(session({}, server));

//ejs
// ejs(server, {
//   root:     pathlib.resolve('template'),
//   layout:   false,
//   viewExt:  '.ejs.html',
//   cache:    false,
//   debug:    false
// });

//router
let mainRouter=new Router();
mainRouter.use('/', indexRouter);
mainRouter.use('/users', usersRouter);


server.use(mainRouter.routes());



// server.use(staticCache(config.wwwDir));
//added by peter
module.exports = server;
