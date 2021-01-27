import React, {useState, Component, useEffect} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  Text,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import Logo from '../assets/PetsLogo.png';
import * as env from '../../dotEnv';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function FirstScreen({navigation}) {
  useEffect(() => {});

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/cardImage6.png')}
        style={styles.cardItemImagePlace}
      />
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.titleStyle}>Title goes here</Text>
          <Text style={styles.subtitleStyle}>Subtitle here</Text>
        </View>
        <View style={styles.actionBody}>
          <TouchableOpacity style={styles.actionButton1}>
            <Text style={styles.actionText1}>ACTION 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton2}>
            <Text style={styles.actionText2}>ACTION 2</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:wp('100%'),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#CCC',
    flexWrap: 'nowrap',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: 'hidden',
  },
  cardItemImagePlace: {
    backgroundColor: '#ccc',
    flex: 1,
    minHeight: 359,
  },
  cardBody: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    left: 0,
    right: 0,
  },
  bodyContent: {
    padding: 16,
    paddingTop: 24,
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 24,
    color: '#FFF',
    paddingBottom: 12,
  },
  subtitleStyle: {
    fontSize: 14,
    color: '#FFF',
    lineHeight: 16,
    opacity: 0.5,
    backgroundColor:'#fff7',
    borderRadius:30
  },
  actionBody: {
    padding: 8,
    flexDirection: 'row',
  },
  actionButton1: {
    padding: 8,
    height: 36,
  },
  actionText1: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  actionButton2: {
    padding: 8,
    height: 36,
  },
  actionText2: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
});
