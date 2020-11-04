import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import OptionsMenu from 'react-native-option-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import api from '../services/api';

export default function CreatePost({navigation}) {
  var teste = 'nome';
  const [username, setUsername] = useState(null);
  const [status, setStatus] = useState('Selecione');
  const [pass1, setPass1] = useState(null);
  const [pass2, setPass2] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [male, setMale] = useState(true);

  const myIcon = (
    <Icon name="menu-down" color={'#777'} style={{alignContent: 'flex-end'}} size={hp('5%')} />
  );
  const opcoes = (
    ['Pet encontrado', 'Pet Perdido', 'Outro', 'Cancelar']
  )

  return (
    <View style={styles.container}>
      <View>
        <Text>Titulo</Text>
        <TextInput placeholder={'Titulo'} style={{backgroundColor: 'white'}} />
      </View>
      <View>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrição            "
          placeholderTextColor="#999"
          keyboardType="default"
          autoCompleteType="email"
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View>
      <Text style={styles.label}>Status</Text>
        <View style={styles.pickerView}>
          <Text
            style={{
              color: '#999',
              fontSize: hp('2.3%'),
              marginBottom: 4,
            }}>
            {status}
          </Text>
          <OptionsMenu
            customButton={myIcon}
            destructiveIndex={1}
            options={opcoes}
            actions={[
              () => setStatus('Encontrado'),
              () => setStatus('Perdido'),
              () => setStatus('Outro'),
              () => {},
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#fa8a41',
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  label: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  pickerView: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 2,
    borderRadius: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: hp('6%'),
    marginBottom: 2,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red',
  },
  buttonAccount: {
    height: 42,
    backgroundColor: '#226cd4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
