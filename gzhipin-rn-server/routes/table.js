const Router=require('koa-router');

let router=new Router();

let table_list={
  "code": 0,
  "message": "ERROR OCCURS",
  "result": {
    "list": [],
    "page": 1,
    "page_size": 10,
    "total_count": 30
  }
}
//localhost:8080/table/list
router.get('/list', async ctx=>{


  let tables=(await ctx.db.execute(`SELECT * FROM table_list `));
  
  // console.log(tables[0]);
  table_list.result.list=tables
//  ctx.body=tables;
// console.log(table_list);
ctx.body=table_list;
});














module.exports=router.routes();
