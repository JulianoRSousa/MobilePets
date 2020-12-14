import React, {Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Checkbox } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      subStep: 1,
      uri: '',
      filePath: '',
      fileData: '',
      description: '',
    };
  }


  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'Pets',
        saveToPhotos: true,
      },
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        this.setState({subStep: 2});
        console.log('Canceled - substep = ', this.state.subStep);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({subStep: 2});
      } else {
        const source = {uri: response.uri};
        this.setState({
          filePath: response,
          fileData: response.data,
          uri: response.uri,
        });
      }
    });
  };

  chooseImage = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'Pets',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      const source = {uri: response.uri};

      if (response.didCancel) {
        this.setState({subStep: 2});
        console.log('Canceled - substep = ', this.state.subStep);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({subStep: 2});
      } else {
        const source = {uri: response.uri};
        this.setState({
          filePath: response,
          fileData: response.data,
          uri: response.uri,
        });
      }
    });
  };
  async sendImage() {
    console.log('enviou');
    this.setState({step: 2});
  }
  selectImage() {
    if (this.state.fileData) {
      this.setState({step: this.state.step + 1});
    } else {
      if (this.state.subStep != 1) {
        return (
          <View>
            {Alert.alert(
              'Imagem não selecionada',
              'Precisamos de uma imagem do pet para prosseguirmos',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    this.setState({subStep: 1});
                  },
                },
              ],
              {cancelable: true},
            )}
          </View>
        );
      }
    }
  }

  stepOne() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={styles.text}>Adicione uma imagem</Text>
        </View>
        <View style={styles.viewRow}>
          <View style={styles.viewContainer}>
            <TouchableOpacity onPress={this.launchCamera} style={styles.button}>
              <Text style={styles.buttonText}>Tirar foto</Text>
              <Icon name={'camera'} color={'white'} size={wp('6%')} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewContainer}>
            <TouchableOpacity onPress={this.chooseImage} style={styles.button}>
              <Text style={styles.buttonText}>Escolher Imagem</Text>
              <Icon
                name={'folder-multiple-image'}
                color={'white'}
                size={wp('6%')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewContainer}>{this.selectImage()}</View>
      </View>
    );
  }
  stepTwo() {
    return (
      <View>
        <Text>Adicione um titulo</Text>
        <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    />
      </View>
    );
  }

  render() {
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
          <View>
            <Text>{this.state.uri}</Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#fa8a41',
  },
  viewRow: {
    flex: 1,
    flexDirection: 'row',
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
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
  body: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  button: {
    height: wp('18%'),
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#3B80FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: wp('4.4%'),
    fontWeight: 'bold',
    color:'white'
  },
});
