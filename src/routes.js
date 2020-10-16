
import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../src/pages/Login'

import Example from '../Example';
import CreateAccount from './pages/CreateAccount';
import ForgotPassword from '../src/pages/ForgotPassword';
import Feed from '../src/pages/Feed';
import FirstScreen from '../src/pages/FirstScreen';

const AuthStack = createStackNavigator({
  SignIn: {
    screen: Login,
    navigationOptions: {
      headerTitle: 'Entrar',
    },
  },
  CreateAccount: {
    screen: CreateAccount,
    navigationOptions: {
      headerTitle: 'Criar uma conta',
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      headerTitle: 'Forgot Password',
    },
  },
});

const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      headerTitle: 'Feed',
    },
  },
  Details: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});

const SearchStack = createStackNavigator({
  Search: {
    screen: Example,
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
});

const DiscoverStack = createStackNavigator({
  Discover: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Discover',
    },
  },
  Details: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});

const MainTabs = createBottomTabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
    },
  },
  Search: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Search',
    },
  },
  Discover: {
    screen: DiscoverStack,
    navigationOptions: {
      tabBarLabel: 'Discover',
    },
  },
});


const SettingsStack = createStackNavigator({
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
});

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
  }
);

const App = createSwitchNavigator({
  Loading: {
    screen: Example,
  },
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: AppModalStack,
  },
});

export default createAppContainer(App);
/*
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';


import Login from './pages/Login';
import FirstScreen from './pages/FirstScreen';
import Feed from './pages/Feed';
import CreateAcc from './pages/CreateAccount';
import CreatePost from './pages/CreatePost';


const Routes = createAppContainer(
  createDrawerNavigator({
    FirstScreen: {
      screen: FirstScreen,
      navigationOptions: {
        drawerLabel:"Hook",
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        drawerLabel:"Login",
      }
    },
    Feed: {
      screen: Feed,
      navigationOptions: {
        drawerLabel:"Feed",
      }
    },
    CreatePost: {
      screen: CreatePost,
      navigationOptions: {
        drawerLabel:"Criar um Post",
        headerTitle: "Criar um Post",
      }
    },
    CreateAcc: {
      screen: CreateAcc,
      navigationOptions: {
        drawerLabel:"Criar uma Conta",
        headerTitle: "Criar uma Conta",
      }
    },
  })
);

export default Routes;
*/