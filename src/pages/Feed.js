import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as env from '../../dotEnv';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PostView from '../components/PostView';

export default function Feed({navigation}) {
  async function logOut() {
    if (
      (await AsyncStorage.getItem('token')) != '000000000000000000000000' &&
      (await AsyncStorage.getItem('token')) != null
    ) {
      try {
        await AsyncStorage.multiSet([
          ['token', '000000000000000000000000'],
          ['user', '000000000000000000000000'],
          ['username', '000000000000000000000000'],
          ['firstName', '000000000000000000000000'],
          ['lastName', '000000000000000000000000'],
          ['male', 'true'],
        ]);
        await api.delete('/deleteauth', {
          headers: {
            token: await AsyncStorage.getItem('token'),
          },
        });
        navigation.navigate('Login');
      } catch (error) {
        navigation.navigate('Login')
        console.log('error: ', error.message);
      }
    } else {
      navigation.navigate('Login');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.topBarInternal}>
          <Icon name="paw" size={hp('5%')} color="white" />
          <Text style={styles.appNameText}>{env.APPNAME}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logOut}>
          <Icon
            name="menu"
            style={{alignContent: 'flex-end'}}
            size={hp('5%')}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.view}>
        <PostView />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8636',
  },
  view: {
    flex: 1,
    backgroundColor: '#eeeeee',
    flexDirection: 'row',
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
});
