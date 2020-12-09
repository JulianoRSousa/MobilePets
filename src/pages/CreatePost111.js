import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Picker,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import OptionsMenu from 'react-native-option-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RNCamera} from 'react-native-camera';
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
    <Icon
      name="menu-down"
      color={'#777'}
      style={{alignContent: 'flex-end'}}
      size={hp('5%')}
    />
  );
  const opcoes = ['Pet encontrado', 'Pet Perdido', 'Outro', 'Cancelar'];


  return (
    <View style={styles.container}>
      <View>
        <Text></Text>
      </View>
      <View>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          placeholderTextColor="#999"
          keyboardType="default"
          autoCompleteType="email"
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
        />
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
});
