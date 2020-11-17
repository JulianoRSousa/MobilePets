import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    setUsername('')
    setPass('')
  }, []);

  async function handleSubmit() {
    try {
      await api
        .post(
          '/createauth',
          {},
          {
            headers: {
              username: username,
              pass: pass,
            },
          },
        )
        .then(async Res => {
          if (Res.data.auth) {
            await AsyncStorage.multiSet([
              ['token', Res.data._id],
              ['user', Res.data.user._id],
              ['username', Res.data.user.username],
              ['firstName', Res.data.user.firstName],
              ['lastName', Res.data.user.lastName],
              ['male', Res.data.user.male.toString()],
              ['picture_url', Res.data.user.picture_url],
            ]
            );
            navigation.navigate('Feed');
          }
        });
    } catch (error) {
      if (error.message == 'Request failed with status code 404') {
        Alert.alert('Erro de conexão', 'Não conseguimos contactar o servidor');
      } else if (error.message == 'Request failed with status code 401') {
        Alert.alert(
          'Nome de usuário ou senha invalida',
          '',
          [
            {
              text: 'Tentar novamente',
              onPress: () => {
                setPass('');
              },
            },
            {
              text: 'Esqueci minha senha',
              onPress: () => {
                navigation.navigate('ForgotPassword');
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert('Erro:', error.message);
      }
    }
  }

  async function startLoggin() {
    if (username && pass.length > 5) {
      handleSubmit();
    } else {
      if (!username || !pass) {
        Alert.alert('', 'Preencha todos os campos', [{text: 'OK'}], {
          cancelable: true,
        });
      } else {
        if (pass.length < 6) {
          Alert.alert('Senha invalida', 'Minimo 6 digitos', [{text: 'OK'}], {
            cancelable: true,
          });
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="default"
        hidden={false}
        backgroundColor="#FF8637"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      <View style={{paddingTop:wp('23%')}}>
        <Text style={styles.logoText} >Pets</Text>
      </View>
      <KeyboardAvoidingView behavior="height" style={styles.form}>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#999"
          keyboardType="default"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          value={pass}
          onChangeText={setPass}
        />
        <TouchableOpacity onPress={() => startLoggin()} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateAccount')}
          style={styles.buttonAccount}>
          <Text style={styles.buttonText}>Criar uma conta</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FF8637',
  },
  logoText: {
    alignSelf: 'center',
    fontSize: wp('17%'),
    paddingBottom: hp('10%'),
    color: 'white',
    fontFamily: 'Chewy-Regular',
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: wp('8%'),
  },
  label: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#FF8637',
    height: 44,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 4,
  },
  buttonAccount: {
    height: 42,
    backgroundColor: '#226cd4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
