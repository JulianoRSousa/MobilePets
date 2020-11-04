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
  useEffect(() => {
    firstLog();
  });

  async function firstLog() {
    if ((await AsyncStorage.getItem('token')) == null) {
      navigation.navigate('Login');
    } else {
      auth();
    }
  }

  async function auth() {
    console.log('iniciou auth, token >> ', await AsyncStorage.getItem('token'));
    try {
      await api
        .get('/confirmauth', {
          headers: {
            token: await AsyncStorage.getItem('token'),
          },
        })
        .then(async Res => {
          if (Res.data.auth) {
            // console.log(Res.data);
            // await AsyncStorage.multiSet(
            //   [
            //     ['token', Res.data.id],
            //     ['user', Res.data._id],
            //     ['username', Res.data.username],
            //     ['firstName', Res.data.firstName],
            //     ['lastName', Res.data.lastName],
            //     ['male', Res.data.male],
            //     [('pictureUrl', Res.data.picture_url)],
            //   ]
            // );
            navigation.navigate('Feed')
          } else {
            navigation.navigate('Login');
          }
        });
    } catch (error) {
      console.log('FirstScreen catch:', error.message);
    }
  }

  return (
    <View style={{alignSelf: 'center', flex: 1, backgroundColor: '#ff8636'}}>
      <StatusBar backgroundColor={'#ff8636'} />
    </View>
  );
}
