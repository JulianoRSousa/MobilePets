import React, {useState, useEffect} from 'react';
import {View, Alert, StyleSheet, Image, StatusBar, SafeAreaView, Text, Button} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import Logo from '../assets/PetsLogo.png';
import * as env from '../../dotEnv';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FirstScreen({navigation}) {
  useEffect(() => {
  });





  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#ff8636'} />
      <Text style={styles.text}>Este post é sobre:</Text>
      <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Uma foto bonita</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Um pet encontrado</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Um pet perdido</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2}>
          <Text style={styles.text}>Outro</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: '#ff8636', 
    paddingVertical:wp('10%')
  },
  text: {
    alignSelf:'center',
    fontSize:wp('10%'),
    paddingVertical:wp('4%'),
    color:'white',
    fontFamily:'Chewy-Regular'
  },
  button: {
    borderColor:'white', 
    justifyContent:'center',
    backgroundColor:'#fff5',
    borderWidth:2, 
    margin:wp('5%'), 
    borderRadius:wp('6%')
  },
  button2: {
    borderColor:'white', 
    justifyContent:'center',
    alignSelf:'center',
    paddingHorizontal:wp('3%'),
    backgroundColor:'#fff5',
    borderWidth:2, 
    margin:wp('5%'), 
    borderRadius:wp('6%')
  }
});


