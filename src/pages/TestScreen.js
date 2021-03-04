import React, {useState, useEffect} from 'react';
import {StatusBar, View, SafeAreaView, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TextInputPets from '../components/TextInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import api from '../services/api';
import { text } from '@fortawesome/fontawesome-svg-core';

export default function TestScreen({navigation}) {
  const [text, setText] = useState('black');

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
      <View
        style={{
          backgroundColor: '#ff861f',
          width: 100,
          height: 30,
        }}>
        <Icon name={'home'} sizeIcon={200}/>
        <TextInputPets
          placeHolder={'new'}
          backgroundColor={'#ddd'}
          radius={25}
          height={'12'}
          width={'80'}
          lineColor={'red'}
          borderColor={'red'}
          textColor={'blue'}
          text={text}
          onChangeText={text => {setText(text)}}
        />
      </View>
    </SafeAreaView>
  );
}
