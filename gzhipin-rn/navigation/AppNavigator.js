import React from 'react';
import { createSwitchNavigator, createStackNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import Login from '../screens/LoginScreen'
import Register from '../screens/RegisterScreen'

const LoginPageStack = createStackNavigator({
  LoginPage:Login,
});



const RegisterPageStack = createStackNavigator({
  RegisterPage:Register,
});


export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login:LoginPageStack,
  Register:RegisterPageStack,
  Main: MainTabNavigator,
});