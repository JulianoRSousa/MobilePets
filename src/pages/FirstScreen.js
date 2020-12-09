import React, {useEffect} from 'react';
import {StatusBar, SafeAreaView, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

export default function FirstScreen({navigation}) {
  useEffect(() => {
    firstLog();
  });

  async function firstLog() {
    if ((await AsyncStorage.getItem('token')) == null) {
      await navigation.navigate('Login');
      return 0;
    } else {
      auth();
    }
  }

  async function auth() {
    console.log('iniciou auth, token >> ', await AsyncStorage.getItem('token'));
    try {
      await api
        .get('/confirmauth', {
          timeout: 2000,
          headers: {
            token: await AsyncStorage.getItem('token'),
          },
        })
        .then(async Res => {
          if (Res.data.auth) {
            await navigation.navigate('Feed');
            return 0
          } else {
            await navigation.navigate('Login');
            return 0;
          }
        })
        .catch(async function(error) {
          console.log('error >> ', error.message);
         await navigation.navigate('Login');
         return 0;
        });
        return 0;
    } catch (error) {
      navigation.navigate('Login');
      return 0;
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ff8636'}}>
      <StatusBar backgroundColor={'#ff8636'} />
      <Text
        style={{
          alignSelf: 'center',
          fontSize: wp('17%'),
          paddingTop: hp('10%'),
          color: 'white',
          fontFamily: 'Chewy-Regular',
        }}>
        Pets
      </Text>
      <LottieView
        source={require('../animations/LoadSymbol.json')}
        autoPlay
        loop
        speed={1.2}
      />
    </SafeAreaView>
  );
}
