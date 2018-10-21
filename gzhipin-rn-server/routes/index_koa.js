//koa
const Router=require('koa-router');
let router=new Router();

const md5 = require('blueimp-md5')

const {UserModel, ChatModel} = require('../db/models')
const filter = {password: 0, __v: 0} // 查询的过滤(去除文檔中的指定属性)

/* GET home page. */
router.get('',  async (ctx, next) => {
  ctx.body={title: 'Koa'};
});

/*
1. 獲取請求参數數据
2. 处理數据
3. 返回响应
 */
// 注册一个用户注册的路由接口
/*router.post('/register', function (req, res) {
  // 1. 獲取請求参數數据
  const {username, password} = req.body
  // 2. 处理數据
  if(username==='admin') { // 不能注册, 要失败
    // 3. 返回响应
    res.send({code: 1, msg: '用户已存在, 請重新注册!'})
  } else {// 可以注册, 保存數据
    // 将username/password保存到數据库的一个集合中users
    const user = {_id: 'abc123', username, password}
    // 3. 返回响应
    res.send({code: 0, data: user})
  }

})*/

// 注册的路由
router.post('register', async (ctx, next) => {

  console.log(`register  ctx.request.fields :${ctx.request.fields}`);

  // 1. 獲取請求参數數据
  const {username, password, type} = ctx.request.fields
  // 2. 处理數据
  // 2.1. 根据username查询users集合中对应的user
  UserModel.findOne({username},  function(error, user) {
    // 2.2. 如果有, 说明已经存在,
    if (user) {
      // 3. 返回响应(失败)
      res.send({
        "code": 1,
        "msg": "此用户已存在"
      })
    } else {
      console.log('---', req.body)
      // 2.3. 如果没有, 保存到users中
      new UserModel({username, password: md5(password), type}).save(function (error, user) {

        console.log(`register:${user}`);
        // 向浏览器返回一个userid的cookie
        res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24 * 7})

        // 3. 返回响应(成功)
        res.send({
          "code": 0,
          "data": {username, type, _id: user._id}
        })
      })

    }
  })

})

// 登錄的路由
router.post('/login', async (req, res) => {
  const {username, password} = ctx.request.field
  // 根据username/password查询users中对应的user
  UserModel.findOne({username, password: md5(password)}, filter,  (error, user) => {
    if (user) { // 有, 成功
      // 向浏览器返回一个userid的cookie
      console.log(`login:${user}`);
      res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24 * 7})

      res.send({
        "code": 0,
        "data": user
      })
    } else { // 没有, 失败
      res.send({
        "code": 1,
        "msg": "用户名或密碼錯誤"
      })
    }
  })
})

// 更新用户路由
router.post('/update', async (req, res) => {
  // 得到請求cookie的userid
  const userid = ctz.cookies.userid
  if (!userid) {// 如果没有, 说明没有登錄, 直接返回提示
    return ctx.body={code: 1, msg: '請先登錄'};
  }

  // 更新數据库中对应的數据
  UserModel.findByIdAndUpdate({_id: userid}, ctx.body,  (err, user) => {// user是數据库中原来的數据
    const {_id, username, type} = user
    // node端 ...不可用
    // const data = {...req.body, _id, username, type}
    // 合并用户信息
    const data = Object.assign(ctx.body, {_id, username, type})
    // assign(obj1, obj2, obj3,...) // 将多个指定的对象进行合并, 返回一个合并后的对象
    ctx.body={code: 0, data}
  })
})

// 根据cookie獲取对应的user
//express
// router.get('/user', function (req, res) {
//   // 取出cookie中的userid
//   const userid = req.cookies.userid
//   if(!userid) {
//     return res.send({code: 1, msg: '請先登錄'})
//   }

//   // 查询对应的user
//   UserModel.findOne({_id: userid}, filter, function (err, user) {
//     return res.send({code: 0, data: user})
//   })
// })

//koa
router.get('user',  async (ctx , next) => {
  // 取出cookie中的userid
  const userid = ctx.cookies.userid
  if(!userid) {
    return ctx.body={code: 1, msg: '請先登錄'}
  }

  // 查询对应的user
  UserModel.findOne({_id: userid}, filter,  (err, user) => {
    return ctx.body={code: 0, data: user}
  })
})
 


/*
查看用户列表
 */
router.get('/userlist',function(req, res){
  const { type } = req.query
  UserModel.find({type},function(err,users){
    return res.json({code:0, data: users})
  })
})

/*
獲取當前用户所有相關聊天信息列表
 */
router.get('/msglist', function (req, res) {
  // 獲取cookie中的userid
  const userid = req.cookies.userid
  // 查询得到所有user文檔數组
  UserModel.find(function (err, userDocs) {
    // 用对象存储所有user信息: key为user的_id, val为name和header组成的user对象
    const users = {} // 对象容器
    userDocs.forEach(doc => {
      users[doc._id] = {username: doc.username, header: doc.header}
    })
    /*
    查询userid相關的所有聊天信息
     参數1: 查询条件
     参數2: 过滤条件
     参數3: 回调函數
    */
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) {
      // 返回包含所有用户和當前用户相關的所有聊天消息的數据
      // res.send({code: 0, data: {users, chatMsgs}}) // 如果传递的是{}/[]内部就会调用json()
      res.json({code: 0, data: {users, chatMsgs}})
    })
  })
})

/*
修改指定消息为已读
 */
router.post('/readmsg', function (req, res) {
  // 得到請求中的from和to
  const from = req.body.from
  const to = req.cookies.userid
  /*
  更新數据库中的chat數据
  参數1: 查询条件
  参數2: 更新为指定的數据对象
  参數3: 是否1次更新多条, 默认只更新一条
  参數4: 更新完成的回调函數
   */
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
    console.log('/readmsg', doc)
    res.send({code: 0, data: doc.nModified}) // 更新的數量
  })
})

//express
// module.exports = router;
//koa
module.exports=router.routes();




//-----------------------------------------------
// const Router=require('koa-router');

// let router=new Router();

// router.get('table', async ctx=>{


//   let tables=(await ctx.db.execute(`SELECT * FROM table_list `));
  
//   console.log(tables[0]);

  
// });

// //localhost:8080/
// router.get('', async ctx=>{
//   let page=1;
//   let page_size=8;

//   let questions=await ctx.db.execute(`
//     SELECT Q.ID,Q.title,ANSWER.content AS best_answer_content,AUTHOR.name,AUTHOR.headline FROM

//     question_table AS Q
//     LEFT JOIN answer_table AS ANSWER ON Q.best_answer_ID=ANSWER.ID
//     LEFT JOIN author_table AS AUTHOR ON ANSWER.author_ID=AUTHOR.ID

//     LIMIT ${(page-1)*page_size},${page_size}
//   `);

//   await ctx.render('list', {
//     questions
//   });
// });

// //localhost:8080/detail/34546456554
// router.get('detail/:id', async ctx=>{
//   let {id}=ctx.params;

//   let question=(await ctx.db.execute(`SELECT * FROM question_table WHERE ID=${id}`))[0];
//   let answers=await ctx.db.execute(`
//     SELECT * FROM
//     answer_table AS ANSWER
//     LEFT JOIN author_table AS AUTHOR ON ANSWER.author_ID=AUTHOR.ID

//     WHERE question_ID=${id}
//   `);
//   question.best_answer=answers[0];
//   answers.splice(0, 1);
//   let topics=await ctx.db.execute(`SELECT * FROM topic_table WHERE ID IN (${question.topics})`);

//   console.log(answers[0]);

//   await ctx.render('item', {
//     question,
//     answers,
//     topics
//   });
// });

// module.exports=router.routes();
