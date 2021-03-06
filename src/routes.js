import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Login from '../src/pages/Login';

import Example from '../Example';
import CreateAccount from './pages/CreateAccount';
import ForgotPassword from '../src/pages/ForgotPassword';
import StatusPost from '../src/pages/StatusPost';
import Feed from '../src/pages/Feed';
import FirstScreen from '../src/pages/FirstScreen';
import TestScreen from '../src/pages/TestScreen';
import Pets from '../src/pages/Pets';
import CreatePost from '../src/pages/CreatePost';
import PageCamera from '../src/pages/Camera';
import IconsList from '../src/pages/IconsList';
import Search from '../src/pages/Search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AuthStack = createStackNavigator({
  SignIn: {
    screen: Login,
    navigationOptions: {
      headerTitle: 'Entrar',
      headerShown: false,
    },
  },
  CreateAccount: {
    screen: CreateAccount,
    navigationOptions: {
      headerShown: true,
      headerStyle: {
        backgroundColor: '#fa8a41',
      },
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerTitle: 'Criar Conta',
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      headerShown: true,
      headerStyle: {
        backgroundColor: '#fa8a41',
      },
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerTitle: 'Recuperar conta',
    },
  },
});

const LoadingStack = createStackNavigator(
  {
    // TestScreen: {
    //   screen: TestScreen,
    //   navigationOptions: {
    //     headerTitle: 'Test',
    //   },
    // },
    FirstScreen: {
      screen: FirstScreen,
      navigationOptions: {
        headerTitle: 'Loading',
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerTitle: 'Login',
      },
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShow: false,
    },
  },
);

const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      headerShown: false,
    },
  },
  Details: {
    screen: Example,
    navigationOptions: {
      headerShown: false,
    },
  },
  CreatePost: {
    screen: CreatePost,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fa8a41',
      },
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerTitle: 'Criar Novo Post',
    },
  },
  Pets: {
    screen: Pets,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fa8a41',
      },
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerTitle: 'Pets',
    },
  },
});

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        headerTitle: 'Search',
      },
    },
    Details: {
      screen: Example,
      navigationOptions: {
        headerTitle: 'Details',
      },
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShow: false,
    },
  },
);

const DiscoverStack = createStackNavigator({
  Discover: {
    screen: IconsList,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const MainTabs = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedStack,
      navigationOptions: {
        tabBarIcon: () => <Icon name="newspaper" size={25} color="white" />,
        tabBarLabel: 'Feed',
      },
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarIcon: () => <Icon name="magnify" size={25} color="white" />,
        tabBarLabel: 'Buscar',
      },
    },
    Discover: {
      screen: DiscoverStack,
      navigationOptions: {
        tabBarIcon: () => <Icon name="account" size={25} color="white" />,
        tabBarLabel: 'Meu Perfil',
      },
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#ff8636',
      inactiveBackgroundColor: '#fa8a41',
      activeTintColor: 'white',
      inactiveTintColor: '#fff6',
    },
    headerMode: 'none',
    navigationOptions: {
      headerShow: false,
    },
  },
);

const SettingsStack = createStackNavigator(
  {
    SettingsList: {
      screen: Example,
      navigationOptions: {
        headerTitle: 'Settings List',
      },
    },
    Profile: {
      screen: Example,
      navigationOptions: {
        headerTitle: 'Profile',
      },
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShow: false,
    },
  },
);

const MainDrawer = createDrawerNavigator({
  MainTabs: MainTabs,
  Settings: SettingsStack,
});

const AppModalStack = createStackNavigator(
  {
    App: MainDrawer,
    Promotion1: {
      screen: Example,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShow: false,
    },
  },
);

const App = createSwitchNavigator(
  {
    Loading: {
      screen: LoadingStack,
    },
    Auth: {
      screen: AuthStack,
    },
    App: {
      screen: AppModalStack,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShow: false,
    },
  },
);

export default createAppContainer(App);
