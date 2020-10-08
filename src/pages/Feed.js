import React, {useState, useEffect} from 'react';
import {Image, View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import {SafeAreaView} from 'react-navigation';
import logo from '../assets/logo.png';

import Book from './postItem';

import PostView from '../components/PostView';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import postItem from './postItem';

export default function Feed({navigation}) {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  

  useEffect(() => {
    console.log('useEffect done');
  }, []);

  async function logout() {
    await api.delete('/deleteauth', {
      headers: {
        token: await AsyncStorage.getItem('token'),
      },
    });
    await AsyncStorage.setItem('token', '000000000000000000000000');
    await AsyncStorage.setItem('user', '000000000000000000000000');
    await AsyncStorage.setItem('email', '000000000000000000000000');
    await AsyncStorage.setItem('firstName', '000000000000000000000000');
    await AsyncStorage.setItem('lastName', '000000000000000000000000');
    await AsyncStorage.setItem('male', true.toString());
    navigation.navigate('Login');
  }

  function navegador() {
    navigation.navigate('CreatePost');
  }



  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View
          style={{
            borderWidth: 2,
            flexDirection: 'row',
            backgroundColor: '#ff8636',
          }}>
        </View>
        <View
          style={{
            borderWidth: 2,
            flexDirection: 'row',
            backgroundColor: '#ff8636',
          }}>
          <Button title="Criar um post" onPress={navegador} />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#eeeeee',
          elevation: 3,
          flexDirection: 'row',
          borderRadius: 3,
        }}>
        <PostView/>
      </View>

      <Button title="LogOut" onPress={logout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
  },
  button: {
    height: 42,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
