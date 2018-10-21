/*
能操作集合數據的model模
1. 連接數據庫
  1.1. 引入mongoose
  1.2. 連接指定數據庫(URL只有數據庫是变化的)
  1.3. 獲取連接對象
  1.4. 绑定連接完成的监听(用来提示連接成功)
2. 定義出對應特定集合的Model並向外暴露
  2.1. 字義Schema(描述文档结构)
  2.2. 定義Model(与集合對應, 可以操作集合)
  2.3. 向外暴露Model
 */
/*1. 連接數據庫*/
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 1.2. 連接指定數據庫(URL只有數據庫是变化的)
mongoose.connect('mongodb://localhost:27017/180315_gzhipin')
// 1.3. 獲取連接對象
const conn = mongoose.connection
// 1.4. 绑定連接完成的监听(用来提示連接成功)
conn.on('connected', function () {
  console.log('db connect success!')
})
/*2. 定義出對應特定集合的Model并向外暴露*/
// 2.1. 字義Schema(描述文档结构)
const userSchema = mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  type: {type: String, required: true}, // 用户类型: dashen/laoban
  header: {type: String}, // 头像名称
  post: {type: String}, // 职位
  info: {type: String}, // 个人或职位简介
  company: {type: String}, // 公司名称
  salary: {type: String} // 工资
})
// 2.2. 定義Model(与集合對應, 可以操作集合)
const UserModel = mongoose.model('users', userSchema)
// 2.3. 向外暴露Model
//module.exports = UserModel
exports.UserModel = UserModel


// 定義chats集合的文档结构
const chatSchema = mongoose.Schema({
  from: {type: String, required: true}, // 发送用户的id
  to: {type: String, required: true}, // 接收用户的id
  chat_id: {type: String, required: true}, // from和to组成的字符串
  content: {type: String, required: true}, // 内容
  read: {type:Boolean, default: false}, // 标识是否已读
  create_time: {type: Number} // 创建时间
})
// 定義能操作chats集合數據的Model
const ChatModel = mongoose.model('chats', chatSchema)
// 向外暴露Model
exports.ChatModel = ChatModel

/*
module.exports = value
exports.xxx = value1
exports.yyy = value2
 */

/*
commonjs模化: 向外暴露的永远是exports的值, 默认值是一个空對象
 */