import React, {useState, useEffect} from 'react';
import {View, Alert, Image, StatusBar, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import Logo from '../assets/PetsLogo.png';
import * as env from '../../dotEnv';

export default function FirstScreen({navigation}) {
  const [token, setToken] = useState('000000000000000000000000');

  useEffect(() => {
    firstLog();
  });

  async function firstLog() {
    setToken(await AsyncStorage.getItem('token'));

    if (token === null || token == '000000000000000000000000') {
      console.log(token);
      navigation.navigate('Login');
    } else {
      auth();
    }
  }

  async function auth() {
    try {
      await api
        .get('/confirmauth', {
          headers: {
            token: token,
          },
        })
        .then(async Res => {
          if (Res.data.auth) {
            await AsyncStorage.setItem('token', '000000000000000000000000');
            await AsyncStorage.setItem('user', '000000000000000000000000');
            await AsyncStorage.setItem('username', '000000000000000000000000');
            await AsyncStorage.setItem('firstName', '000000000000000000000000');
            await AsyncStorage.setItem('lastName', '000000000000000000000000');
            await AsyncStorage.setItem('male', true.toString());
            navigation.navigate('Feed');
          }
        });
    } catch (error) {
      Alert.alert('error:', error.mesage);
    }
  }

  return (
    <View style={{alignSelf: 'center', flex: 1, backgroundColor: '#ff8636'}}>
      <StatusBar backgroundColor={'#ff8636'} />
      
    </View>
  );
}
