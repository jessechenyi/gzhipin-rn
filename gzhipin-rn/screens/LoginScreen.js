/*
登錄组件
 */
import React, {Component} from 'react'
// import { View, WingBlank, WhiteSpace, InputItem, Button} from 'antd-mobile-rn'
import  Button from 'antd-mobile-rn/lib/button'
import View from 'antd-mobile-rn/lib/view'
import WingBlank from 'antd-mobile-rn/lib/wing-blank'
import WhiteSpace from 'antd-mobile-rn/lib/white-space'
import InputItem from 'antd-mobile-rn/lib/input-item'

// import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

// import {login} from '../../redux/actions'
// import Logo from '../../components/logo/logo'

export default class Login extends Component {

  static navigationOptions = {
    title: '用户登錄',
  };
  //by peter
  // static propTypes = {
  //   user: PropTypes.object.isRequired
  // }

  // 定义初始化状态
  state = {
    username: '',
    password: '',
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val  // 属性名是name的值, 而是name本身
    })
  }
  

  login = () => {
    // this.props.login(this.state)
    //login(this.state)
  }

  goRegister = () => {
    //跳转到登錄的路由
    // this.props.history.replace('/register')
    console.log("goRegister")
    this.props.navigation.navigate("Register")
  }

  render() {
    
    // const {msg, redirectTo} = this.props.user
    
    // if(redirectTo) {
    //   return <Redirect to={redirectTo}/>
    // }
    return (
      // <View style={{ paddingTop: 30 }}>
      <View>
        {/* <NavBar>用户登錄</NavBar> */}
        {/* <Logo/> */}
        <WingBlank>
          {/* <List>
            <p className='error-msg'>{msg}</p>
            <WhiteSpace/>
            <InputItem placeholder='請輸入用户名' onChange={val=> this.handleChange('username', val)}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='請輸入密碼' onChange={val=> this.handleChange('password', val)}>密碼:</InputItem>

            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;錄</Button>
            <WhiteSpace/>
            <Button onClick={this.goRegister}>還没有賬户</Button>
          </List> */}

          {/* <p className='error-msg'>{msg}</p> */}
            <WhiteSpace/>
            <InputItem placeholder='請輸入用户名' onChange={val=> this.handleChange('username', val)}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='請輸入密碼' onChange={val=> this.handleChange('password', val)}>密碼:</InputItem>

            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;錄</Button>
            <WhiteSpace/>
            <Button onClick={this.goRegister}>還没有賬户</Button>
        </WingBlank>
      </View>
    )
  }
}

// export default connect(
//   state => ({user: state.user}),
//   {login}
// )(Login)

/*
a = a + 3
a.xx
a()
fn(a)
{xx:a}
 */