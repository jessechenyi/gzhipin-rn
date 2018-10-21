/*
注册组件
 */
import React, {Component} from 'react'
// import { View,List, WingBlank, WhiteSpace, InputItem, Button,Radio} from 'antd-mobile-rn'
import  Button from 'antd-mobile-rn/lib/button'
import  List from 'antd-mobile-rn/lib/list'
import View from 'antd-mobile-rn/lib/view'
import WingBlank from 'antd-mobile-rn/lib/wing-blank'
import WhiteSpace from 'antd-mobile-rn/lib/white-space'
import InputItem from 'antd-mobile-rn/lib/input-item'
import Radio from 'antd-mobile-rn/lib/radio'

// import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'

// import Logo from '../../components/logo/logo'
// import {register} from '../../redux/actions'

// const Item = List.Item

// Register是UI组件
export default class Register extends Component {

  static navigationOptions = {
    title: '用户注册',
  };
  // 定义初始化状态
  state = {
    username: '',
    password: '',
    password2: '',
    type: 'dashen', // laoban
    msg: '',  // 需要顯示的錯誤信息
    redirectTo: '' // 需要自動跳轉的路徑
  }

  /*xxx = (val) => {
    this.setState({
      username: val
    })
  }
  yyy = (val) => {
    this.setState({
      password: val
    })
  }*/

  handleChange = (name, val) => {
    this.setState({
      [name]: val  // 属性名是name的值, 而是name本身
    })
  }

  register = () => {
    // console.log(this.state)
    // this.props.register(this.state)
    
  }

  goLogin = () => {
    //跳转到登陆的路由
    // this.props.history.replace('/login')
    console.log("goLogin")
    this.props.navigation.navigate("Login")
  }

  render() {
    // const {type} = this.state
    // const {msg, redirectTo} = this.props.user
    // 如果redirectTo有值
    // if(redirectTo) {
    //   // 跳转到redirectTo
    //   return <Redirect to={redirectTo}/>
    // }
    return (
      // <View style={{ paddingTop: 30 }}>
      <View>
        {/* <NavBar>用户注册</NavBar> */}
        {/* <Logo/> */}
        <WingBlank>
          <List>
            {/* <p className='error-msg'>{msg}</p> */}
            <WhiteSpace/>
            <InputItem placeholder='请输入用户名' onChange={val=> this.handleChange('username', val)}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码' onChange={val=> this.handleChange('password', val)}>密码:</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入确认密码' onChange={val=> this.handleChange('password2', val)}>确认密码:</InputItem>
            <WhiteSpace/>
            <List.Item>
              {/* <span>用户类型: </span>&nbsp;&nbsp; */}
              <Radio checked={this.state.type==='dashen'} onChange={() => this.handleChange('type', 'dashen')}>大神</Radio>
              <Radio checked={this.state.type==='laoban'} onChange={() => this.handleChange('type', 'laoban')}>老板</Radio>
            </List.Item>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;册</Button>
            <WhiteSpace/>
            <Button onClick={this.goLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </View>
    )
  }
}

// 向外暴露是包含UI组件的容器组件
// export default connect(
//   state => ({user: state.user}),
//   {register}
//   /*
//   function register(user) {
//       dispatch(register(user))
//     }
//    */
// )(Register)

/*
组件的render什么时候执行?
1. 初始显示
2. 更新显示
    1). 自身状态变化 : this.setState()
    2). 接收的外部数据属性变化了
 */