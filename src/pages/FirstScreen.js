import React, {useEffect} from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

export default function FirstScreen({navigation}) {
  useEffect(() => {
    firstLog()
    console.log('iniciou useeffect')
  });

  async function firstLog() {
    var token = await AsyncStorage.getItem('token');

    if (token != '000000000000000000000000') {
      auth();
    } else {
      navigation.navigate('Login');
    }
  }

  async function auth() {
    await AsyncStorage.getItem('token');
    try {
      await api
        .get('/confirmauth', {
          headers: {
            token: await AsyncStorage.getItem('token'),
          },
        })
        .then(async Res => {
          if (Res.data.auth) {
            await AsyncStorage.setItem('token', Res.data._id);
            await AsyncStorage.setItem('user', Res.data.user._id);
            await AsyncStorage.setItem('username', Res.data.user.username);
            await AsyncStorage.setItem('firstName', Res.data.user.firstName);
            await AsyncStorage.setItem('lastName', Res.data.user.lastName);
            await AsyncStorage.setItem('male', Res.data.user.male.toString());
            navigation.navigate('Feed');
          }
        });
    } catch (error) {
      Alert.alert('Erro:', error.message);
    }
  }

  return (
    <View style={{alignSelf: 'center', flex: 1}}>
      <ActivityIndicator size="large" color="#0000ff" style={{flex: 1}} />
    </View>
  );
}
