/*
包含n个接口請求函數的模塊
每个函數對應一个接口
每个函數的返回值是promise对象
 */
import ajax from './ajax'

// const BASE = 'http://localhost:4000'
const BASE = ''
// 請求注册接口
export const reqRegister = ({username, password, type}) => ajax(BASE+'/register', {username, password, type}, 'POST')

// 請求登陆接口
export const reqLogin = (username, password) => ajax(BASE+'/login', {username, password}, 'POST')

// 更新用户信息
export const reqUpdateUser = (user) => ajax(BASE+'/update', user,'POST')

// 获取当前用户
export const reqUser = () => ajax(BASE+'/user')

// 获取指定类型的用户列表
export const reqUsers = (type) => ajax(BASE+'/userlist', {type})


// 請求获取当前用户的所有聊天记录
export const reqChatMsgList = () => ajax('/msglist')

// 標識查看了指定用户發送的聊天信息
export const reqReadChatMsg = (from) => ajax('/readmsg', {from}, 'POST')

/*
模塊1: export xxx  export yyy: 向外暴露的是 {xxx, yyy}
模塊2: export default xxx: 向外暴露的是xxx

import {xxx, yyy} from '模塊1'
import xxx from '模塊2'  // xxx这个名稱可以随便命名
 */