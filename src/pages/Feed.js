import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Text,
} from 'react-native';
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
import OptionsMenu from 'react-native-option-menu';
import PetsMenu from '../components/PetsMenu';
import ColorPicker from '../components/ColorPicker';

export default function Feed({navigation}) {
  const [updateTimes, setupdateTimes] = useState(0);

  useEffect(() => {}, [updateTimes]);

  async function logOut() {
    console.log('logout')
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      try {
        await AsyncStorage.multiRemove([
          'token',
          'username',
          'firstName',
          'lastName',
          'male',
          'picture_url',
        ]);
        await api.delete(
          '/deleteauth',
          {
            headers: {token: token},
          },
          navigation.navigate('Login'),
        );
      } catch (error) {
        console.log('error: ', error.message);
      }
    } else {
      navigation.navigate('Login');
    }
  }
  const myIcon = (
    <Icon
      name="menu"
      style={{
        alignContent: 'flex-end',
        marginHorizontal: wp('2%'),
        marginVertical: wp('2%'),
      }}
      size={wp('8%')}
      color="white"
    />
  );

  function navegar(page) {
    console.log('iniciou navegar to ', page);
    navigation.navigate(page);
  }

  function updateFeed() {
    setupdateTimes(updateTimes + 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#ff8636'} />
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.topBarInternal}>
          <Icon name="paw" size={hp('5%')} color="white" />

          <Text style={styles.appNameText}>{env.APPNAME}</Text>
        </TouchableOpacity>
        <PetsMenu menuTags={['teste','teste2']} actions={[teste]}  />
      </View>
      <View style={styles.view}>
        <PostView />
      </View>
    </SafeAreaView>
  );

  function teste(){
    console.log('ddd')
  }
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
