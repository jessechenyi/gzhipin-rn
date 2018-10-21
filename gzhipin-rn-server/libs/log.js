const fs=require('fs');
const config=require('../config');

module.exports=server=>{
  server.use(async (ctx,next)=>{
    await new Promise((resolve, reject)=>{
      fs.appendFile(config.logpath, `[${Date.now()}] ${ctx.method} ${ctx.url}\r\n`, err=>{
        resolve();
      });
    });

    await next();
  });
};
