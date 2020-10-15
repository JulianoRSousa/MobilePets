import React, {useState, useEffect} from 'react';
import {Image, View, Text, StyleSheet, Button, StatusBar, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import {SafeAreaView} from 'react-navigation';
import * as env from '../../dotEnv';

import PostView from '../components/PostView';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Feed({navigation}) {

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    async function getUser() {
      await api
        .get('/loadUser', {
          headers: {
            token: await AsyncStorage.getItem('token'),
          },
        })
        .then(response => setUserInfo(response.data));
      }
    getUser();
  }, []);

  async function logout() {
    await api.delete('/deleteauth', {
      headers: {
        token: await AsyncStorage.getItem('token'),
      },
    });
    await AsyncStorage.setItem('token', '000000000000000000000000');
    await AsyncStorage.setItem('user', '000000000000000000000000');
    await AsyncStorage.setItem('email', '000000000000000000000000');
    await AsyncStorage.setItem('firstName', '000000000000000000000000');
    await AsyncStorage.setItem('lastName', '000000000000000000000000');
    await AsyncStorage.setItem('male', true.toString());
    navigation.navigate('Login');
  }

  function navegador() {
    navigation.navigate('CreatePost');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#ff8636'} />

      <View style={styles.topLayout}>
        <View style={styles.view1} />
        <View style={styles.topBar}>
          <View style={styles.topBarInternal}>
            <Icon name="paw" size={hp('5%')} color="white" />
            <Text style={styles.appNameText}>{env.APPNAME}</Text>
          </View>
          <Icon
            name="menu"
            style={{alignContent: 'flex-end'}}
            size={hp('5%')}
            color="white"
          />
        </View>
        <TouchableOpacity style={styles.userInfo}>
          
            <Image
              style={styles.picture}
              source={{
                uri:
                  userInfo.picture_url,
              }}
            />
          <View>
            <Text style={styles.userNameText}>{userInfo.firstName}</Text>
            <Text style={styles.userInfoText}>144 seguidores</Text>
            <Text style={styles.userInfoText}> 2 Pets</Text>
          </View>
        </TouchableOpacity>
        <Button title="Criar um post" onPress={navegador} />
        <View style={styles.view1} />
      </View>
      <View style={styles.view2}>
        <PostView />
      </View>
      <Button title="LogOut" onPress={logout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8636',
  },
  topLayout: {
    backgroundColor: '#ff8636',
    margin: 0,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff8636',
    margin: 0,
    marginRight: hp('0.5%'),
  },
  topBarInternal: {
    flex: 2,
    flexDirection: 'row',
    paddingLeft: wp('3%'),
    paddingBottom: wp('2%'),
  },
  appNameText: {
    color: 'white',
    fontSize: hp('3.5%'),
    fontFamily: 'Chewy-Regular',
    paddingLeft: wp('1%'),
    paddingTop: hp('.5%'),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picture: {
    resizeMode: 'cover',
    width: wp('28%'),
    height: wp('28%'),
    borderRadius: wp('8%'),
    margin: wp('3%'), 
    alignItems: 'center',
    justifyContent: 'center' ,
  },
  userNameText: {
    color: 'white',
    fontSize: hp('3.5%'),
    fontFamily: 'Chewy-Regular',
    paddingLeft: wp('2%'),
  },
  userInfoText: {
    color: 'white',
    fontSize: hp('2%'),
    fontFamily: 'Chewy-Regular',
    paddingLeft: wp('2%'),
  },
  view1: {
    borderWidth: 2,
    flexDirection: 'row',
    backgroundColor: '#ff8636',
  },
  view2: {
    flex: 1,
    backgroundColor: '#eeeeee',
    elevation: 3,
    flexDirection: 'row',
    borderRadius: 3,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
  },
  button: {
    height: 42,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
