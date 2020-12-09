import React, {Fragment, Component, useEffect} from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  CameraRoll,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-community/async-storage';
import OptionsMenu from 'react-native-option-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RNCamera} from 'react-native-camera';
import api from '../services/api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      uri: '',
      description:''
    };
  }

  renderCamera() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'Pets',
        saveToPhotos: true,
      },
    };

    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);
    });
  }

  stepOne() {
    return (
      <View>
      <View>
      <Text style={styles.text} >Adicione uma imagem</Text>
      </View>
      <View>

      </View>
      </View>
    );
  }
  stepTwo() {
    return (
      <View>
        <Text>StepTwo</Text>
      </View>
    );
  }

  render() {
    console.log(this.step);
    if (this.state.step == 1) {
      return (
        <View style={styles.container}>
          <View>{this.stepOne()}</View>
        </View>
      );
    } else if (this.state.step == 2) {
      return (
        <View style={styles.container}>
          <View>{this.stepTwo()}</View>
        </View>
      );
    }
  }
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
    alignSelf: 'center',
    fontSize: wp('10%'),
    paddingVertical: wp('4%'),
    color: 'white',
    fontFamily: 'Chewy-Regular',
  },
  button: {
    borderColor: 'white',
    justifyContent: 'center',
    backgroundColor: '#fff5',
    borderWidth: 2,
    margin: wp('5%'),
    borderRadius: wp('6%'),
  },
});
