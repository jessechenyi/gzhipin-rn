//koa
const Router=require('koa-router');
let router=new Router();



//express
// var express = require('express');
// var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//express
// module.exports = router;
//koa
module.exports=router.routes();
