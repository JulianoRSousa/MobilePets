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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FirstScreen({navigation}) {
  useEffect(() => {});

  return (
    <View>
      <View style={styles.containerCard}>
        <Image
          source={require('../assets/images/cardImage6.png')}
          style={styles.cardItemImagePlaceCard}
        />
        <View style={styles.cardBodyCard}>
          <View style={styles.bodyContentCard}>
            <Text style={styles.titleStyleCard}>Title goes here</Text>
            <Text style={styles.subtitleStyleCard}>Subtitle here</Text>
          </View>
        </View>
      </View>
      <View style={styles.actionBodyCard}>
        <TouchableOpacity style={styles.actionButton1Card}>
          <Icon  name={'heart'} color={'white'} size={wp('8%')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton1Card}>
          <Icon name={'comment'} color={'white'} size={wp('8%')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton2Card}>
          <Icon name={'comment'} color={'white'} size={wp('8%')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    height: wp('100%'),
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
  cardItemImagePlaceCard: {
    backgroundColor: '#ccc',
    flex: 1,
    minHeight: wp('100%'),
  },
  cardBodyCard: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    left: 0,
    right: 0,
  },
  bodyContentCard: {
    padding: 16,
    paddingTop: 24,
    justifyContent: 'center',
  },
  titleStyleCard: {
    fontSize: 24,
    color: '#FFF',
    paddingBottom: 12,
  },
  subtitleStyleCard: {
    fontSize: 14,
    color: '#FFF',
    lineHeight: 16,
    opacity: 0.5,
    backgroundColor: '#fff7',
    borderRadius: 30,
  },
  actionBodyCard: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
    marginHorizontal: 2,
    padding: 8,
    flexDirection: 'row',
  },
  actionButton1Card: {
    padding: 8,
    height: 36,
    justifyContent:'center'
  },
  actionText1Card: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  actionButton2Card: {
    padding: 8,
    height: 36,
    justifyContent:'center',
  },
  actionTextCard2: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
});
