import React, {useEffect} from 'react';
import {StatusBar, SafeAreaView, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

export default function Seach({navigation}) {


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
        Search
      </Text>
    </SafeAreaView>
  );
}
