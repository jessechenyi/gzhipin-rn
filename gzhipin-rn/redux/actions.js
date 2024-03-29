/*
包含n个action creator函数的模块
同步action: 对象  (与action type一一对应)
異步action: 函数
 */
// 引入客户端io
import io from 'socket.io-client'
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUsers,
  reqChatMsgList,
  reqReadChatMsg
} from '../api'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USER_LIST,
  RECEIVE_CHAT_MSGS,
  RECEIVE_CHAT_MSG,
  CHAT_MSG_READ
} from './action-types'

// 成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 失败的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

// 接收用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
// 接收用户列表的同步action
const receiveUserList = (userList) => ({type:RECEIVE_USER_LIST, data: userList})

//  接收消息列表的同步action
const receiveChatMsgs = ({users, chatMsgs, meId}) => ({type: RECEIVE_CHAT_MSGS, data: {users, chatMsgs, meId}})
//  接收一个消息的同步action
const receiveChatMsg = (chatMsg, meId) => ({type: RECEIVE_CHAT_MSG, data: {chatMsg, meId}})

// 一个聊天的消息更新为已读了
const chatMsgRead = ({from, to, count}) => ({type: CHAT_MSG_READ, data: {from, to, count}})


/*
注册的異步action
1. 执行異步代碼(发ajax请求)
2. 有了结果后, 根据结果不同分发不同的同步action
 */
export function register(user) {
  const {username, password, password2, type} = user
  // 进行前台表单验证, 如果不通过, 直接返回一个失败的同步action对象
  if (!username) {
    return errorMsg('必須指定用户名')
  } else if (!password) {
    return errorMsg('必須指定用密碼')
  } else if (password !== password2) {
    return errorMsg('两次密碼必須一致!')
  } else if (!type) {
    return errorMsg('必須指定用用户類型')
  }

  return async dispatch => {
    // 1. 执行異步代碼(发ajax请求)
    /* const promise = reqRegister({username, password, type})
     promise.then(response => {
       const result = response.data
       if(result.code===0) { // 成功
         // 分发成功的同步action
         dispatch(authSuccess(result.data))
       } else { // 失败
         // 分发失败的同步action
         dispatch(errorMsg(result.msg))
       }
     })*/

    const response = await reqRegister({username, password, type})
    const result = response.data
    if (result.code === 0) { // 成功
      getChatMsgs(dispatch, result.data._id)
      // 分发成功的同步action
      dispatch(authSuccess(result.data))
    } else { // 失败
      // 分发失败的同步action
      dispatch(errorMsg(result.msg))
    }
  }
}

/*
1. async/await的作用
  1). 简化promise的使用
  2). 使用同步编程实现異步流程效果
2. async/await如何使用
  await: 执行一个返回promise的函数, 想直接得到異步返回的结果, 在函数调用的左侧加await
  async: 包含await的语句所在函数定义的左侧加async
 */


/*
登陆的異步action
 */
export function login(user) {

  const {username, password} = user
  //by peter
  if (!username) {
    return errorMsg('必須指定用户名')
    
  } else if (!password) {
    return errorMsg('必須指定用密碼')
    
  }


  return async dispatch => {

    // 进行前台表单验证, 如果不通过, 分发失败的同步action对象
    // if (!username) {
    //   dispatch(errorMsg('必須指定用户名'))
    //   return
    // } else if (!password) {
    //   dispatch(errorMsg('必須指定用密碼'))
    //   return
    // }

    const response = await reqLogin(username, password)
    const result = response.data
    
    if (result.code === 0) { // 成功
      getChatMsgs(dispatch, result.data._id)
      // 分发成功的同步action
      dispatch(authSuccess(result.data))
    } else { // 失败
      // 分发失败的同步action
      dispatch(errorMsg(result.msg))
    }
  }
}


/*
更新用户的異步action
 */
export function updateUser(user) {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data // {code: 0, data: user} {code:1, msg: 'xxx'}
    if(result.code===0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

/*
獲取當前用户的異步action
 */
export function getUser () {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if(result.code===0) {
      getChatMsgs(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

/*
獲取指定分类的用户列表的異步action
 */
export function getUserList(type) {
  return async dispatch => {
    const response = await reqUsers(type)
    const result = response.data
    if(result.code===0) {
      dispatch(receiveUserList(result.data))
    }
  }
}

// 连接服务器, 得到代表连接的socket对象
//express
// const socket = io('ws://localhost:4000')

//koa
const socket = io('ws://localhost:4000')


function initIO(dispatch, meId) {
  if(!io.socket) { // 保证on()只执行一次
    io.socket = socket
    // 绑定接收服务器发送消息的监听(receiveMsg: chatMsg)
    socket.on('receiveMsg', (chatMsg) => {
      if(meId===chatMsg.to || meId===chatMsg.from) {// 发给我的/我发去的
        dispatch(receiveChatMsg(chatMsg, meId))
      }

    })
  }
}


/*
向服务器发送socketio消息的異步action
 */
export function sendMessage({content, from, to}) {
  return dispatch => {

    // 向服务器端发消息
    socket.emit('sendMsg', {content, from, to})
    console.log('sendMsg', {content, from, to})
  }
}

/*
獲取當前用户相關的所有聊天
必須在cookie中有了userid之后才能调用
 */
async function getChatMsgs(dispatch, meId) {
  // 绑定用于接收新消息的监听
  initIO(dispatch, meId)

  const response = await reqChatMsgList()
  const result = response.data
  if(result.code===0) {
    const {users, chatMsgs} = result.data
    dispatch(receiveChatMsgs({users, chatMsgs, meId}))
  }
}

/*
查看更新未读消息的異步action
 */
export function readChatMsg(from, to) {
  return async dispatch => {
    const response = await reqReadChatMsg(from)
    const result = response.data
    if(result.code===0) {
      const count = result.data
      dispatch(chatMsgRead({from, to, count}))
    }
  }
}
