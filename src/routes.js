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

