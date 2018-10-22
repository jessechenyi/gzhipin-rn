import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';
// import LinksScreen from '../screens/LinksScreen';
// import SettingsScreen from '../screens/SettingsScreen';

import LaobanScreen from '../screens/laoban/laoban';
import LaobanScreenInfo from '../screens/laoban-info/laoban-info';

import DashenScreen from '../screens/dashen/dashen';
import DashenScreenInfo from '../screens/dashen-info/dashen-info';

import MessageScreen from '../screens/message/message';
import ChatScreen from '../screens/chat/chat';

import PersonalScreen from '../screens/personal/personal';

const LaobanStack = createStackNavigator({
  Laoban: LaobanScreen,
  LaobanInfo: LaobanScreenInfo,
});

LaobanStack.navigationOptions = {
  tabBarLabel: '老板',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const DashenStack = createStackNavigator({
  Dashen: DashenScreen,
  DashenInfo: DashenScreenInfo,
});

DashenStack.navigationOptions = {
  tabBarLabel: '大神',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const MessageStack = createStackNavigator({
  Message: MessageScreen,
  ChatScreen: ChatScreen,
});

MessageStack.navigationOptions = {
  tabBarLabel: '聊天',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

const PersonalStack = createStackNavigator({
  Personal: PersonalScreen,
});
MessagPersonalStackeStack.navigationOptions = {
  tabBarLabel: '個人',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
// });

// HomeStack.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

// const LinksStack = createStackNavigator({
//   Links: LinksScreen,
// });

// LinksStack.navigationOptions = {
//   tabBarLabel: 'Links',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
//     />
//   ),
// };

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
//     />
//   ),
// };

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
