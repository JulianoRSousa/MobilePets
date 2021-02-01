import React, {Component, useEffect} from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  Text,
  Image,
  Picker,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LottieView from 'lottie-react-native';

import NormalButton from '../components/NormalButtons';
import UserLogo from '../components/UserLogo';
import StatusLogo from '../components/StatusLogo';

import OptionsMenu from 'react-native-option-menu';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      subStep: 1,
      uri: null,
      filePath: null,
      fileData: null,
      description: null,
      status: 1,
      userInfo: null
    };
  }
  componentDidMount(){
    this.loadUser()
  }

  nextStep() {
    console.log('nextStep: step before: ', this.state.step);
    this.setState({step: this.state.step + 1});
  }

  previousStep() {
    if (this.state.step >> 1) this.setState({step: this.state.step - 1});
    console.log('previousStep: step now: ', this.state.step);
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

  async loadUser() {
   var userInfo = await AsyncStorage.getItem('firstName');
    userInfo = (userInfo + ' ' + (await AsyncStorage.getItem('lastName')))+''
    this.setState({userInfo: userInfo})
  }

  selectImage() {
    if (this.state.fileData) {
      console.log('fileData: not null');
      this.nextStep();
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
            <NormalButton
              icon={'camera'}
              title={'Tirar foto'}
              onPress={this.launchCamera}
            />
          </View>
          <View style={styles.viewContainer}>
            <NormalButton
              icon={'folder-multiple-image'}
              title={'Escolher Imagem'}
              onPress={this.chooseImage}
            />
          </View>
        </View>
        <View style={styles.viewContainer}>{this.selectImage()}</View>
      </View>
    );
  }
  stepTwo() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Eu:</Text>
        <View
          style={{
            backgroundColor: '#fa8a41',
            borderWidth: 1.5,
            borderRadius: 5,
            borderColor: 'white',
          }}>
          <Picker
            selectedValue={this.state.status}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({status: itemValue})
            }>
            <Picker.Item label="Encontrei um pet" value={1} />
            <Picker.Item label="Perdi meu pet" value={2} />
            <Picker.Item label="Outro" value={3} />
          </Picker>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('70%'),
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                step: 1,
                subStep: 1,
                description: null,
                status: 1,
              });
            }}
            style={styles.nextButton}>
            <LottieView
              style={{
                height: wp('20%'),
                width: wp('20%'),
                transform: [{rotate: '90deg'}, {translateY: 5.5}],
              }}
              source={require('../animations/nextArrow.json')}
              autoPlay
              loop
              speed={1.2}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.nextStep();
            }}
            style={styles.nextButton}>
            <LottieView
              style={{height: wp('20%'), width: wp('20%')}}
              source={require('../animations/nextArrow.json')}
              autoPlay
              loop
              speed={1.2}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  stepThree() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Adicione uma descrição:</Text>
        <View
          style={{
            backgroundColor: '#fa8a41',
            borderWidth: 1.5,
            borderRadius: 5,
            borderColor: 'white',
          }}>
          <TextInput
            autoCapitalize="sentences"
            autoFocus={true}
            maxLength={128}
            placeholder="Digite uma descrição"
            textAlignVertical="top"
            multiline={true}
            onChangeText={value => this.setState({description: value})}
            style={{
              backgroundColor: '#fffd',
              width: wp('90%'),
              height: wp('20%'),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('70%'),
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                step: 2,
                subStep: 1,
                description: null,
                status: 1,
              });
            }}
            style={styles.nextButton}>
            <LottieView
              style={{
                height: wp('20%'),
                width: wp('20%'),
                transform: [{rotate: '90deg'}, {translateY: 5.5}],
              }}
              source={require('../animations/nextArrow.json')}
              autoPlay
              loop
              speed={1.2}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                step: 4,
                subStep: 1,
              });
            }}
            style={styles.nextButton}>
            <LottieView
              style={{height: wp('20%'), width: wp('20%')}}
              source={require('../animations/nextArrow.json')}
              autoPlay
              loop
              speed={1.2}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  StepFour() {
    if (this.state.status == 2) {
      return (
        <View style={styles.containerCard}>
          <View>
            <Text>Escolha o pet</Text>
          </View>
          <View>
            <Text>Meu pet não está listado</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.containerCard}>
          <Image
            source={{uri: this.state.uri}}
            style={styles.cardItemImagePlaceCard}
          />
          <View style={styles.cardBodyCard}>
            <View style={styles.bodyContentCard}>
              <Text style={styles.subtitleStyleCard}>
                {this.state.description}
              </Text>
            </View>
            <View style={{alignSelf: 'center', flexDirection: 'row'}}>
              <View style={styles.InternBodyCard}>
                <TouchableOpacity style={styles.actionButton1Card}>
                  <Icon name={'heart'} color={'white'} size={wp('8%')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton1Card}>
                  <Icon name={'comment'} color={'white'} size={wp('8%')} />
                </TouchableOpacity>
              </View>
              <View style={styles.InternTextCard}>
                <StatusLogo status={this.state.status} />
              </View>
              <View style={styles.InternTextCard}>
                <UserLogo title={this.state.userInfo} onPress={console.log('onpress')} source={this.state.uri}/>
              </View>
            </View>
          </View>
        </View>
      );
    }
    
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
    } else if (this.state.step == 3) {
      return <View style={styles.container}>{this.stepThree()}</View>;
    } else if (this.state.step == 4) {
      return (
        <View style={styles.container}>
          <View>{this.StepFour()}</View>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('70%'),
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                step: 3,
              });
            }}
            style={styles.nextButton}>
            <LottieView
              style={{
                height: wp('20%'),
                width: wp('20%'),
                transform: [{rotate: '90deg'}, {translateY: 5.5}],
              }}
              source={require('../animations/nextArrow.json')}
              autoPlay
              loop
              speed={1.2}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
          <NormalButton
            icon={'upload-outline'}
              title={'Postar'}
              onPress={console.log(this.state)}
          />
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
    justifyContent: 'center',
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
  InternBodyCard: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    width: wp('33%'),
    justifyContent:'center',
    alignItems:'center',
  },
  InternTextCard: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    width: wp('33%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: wp('13%'),
    height: hp('7%'),
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: hp('100%'),
    marginLeft: wp('5%'),
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
  picker: {
    height: wp('15%'),
    width: wp('55%'),
    color: 'white',
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
    borderWidth: 1.5,
    borderColor: 'white',
    backgroundColor: '#258DEC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 6,
    shadowOpacity: 0.35,
    shadowRadius: 2,
    overflow: 'visible',
  },
  buttonText: {
    fontSize: wp('4.4%'),
    fontWeight: 'bold',
    color: 'white',
  },
  container1Post: {
    flex: 1,
  },
  topLayoutPost: {
    backgroundColor: '#ff8636',
    margin: 0,
    borderBottomEndRadius: wp('5%'),
    borderBottomStartRadius: wp('5%'),
  },

  userInfoPost: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picture1Post: {
    borderColor: '#0008',
    borderWidth: 1,
    resizeMode: 'cover',
    width: wp('28%'),
    height: wp('28%'),
    borderRadius: wp('8%'),
    margin: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameTextPost: {
    color: 'white',
    fontSize: hp('3.5%'),
    fontFamily: 'Chewy-Regular',
    paddingLeft: wp('2%'),
  },
  userInfoTextPost: {
    color: 'white',
    fontSize: hp('2%'),
    fontFamily: 'Chewy-Regular',
    paddingLeft: wp('2%'),
  },
  view1Post: {
    flexDirection: 'row',
    backgroundColor: '#ff8636',
  },
  view2Post: {
    flex: 1,
    backgroundColor: '#eeeeee',
    flexDirection: 'row',
  },
  petNamePost: {
    fontSize: wp('5.5%'),
    textAlign: 'left',
    textAlignVertical: 'center',
    color: 'white',
    marginLeft: hp('2%'),
    fontFamily: 'Chewy-Regular',
    backgroundColor: '#FF8637dd',
    alignContent: 'flex-start',
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    borderRadius: wp('3%'),
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  logoPost: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonPost: {
    height: 42,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },
  buttonTextPost: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  containerPost: {
    flex: 1,
  },
  view2Post: {
    paddingHorizontal: 6,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    transform: [{translateY: hp('3%')}],
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'red',
  },
  listItemPost: {
    aspectRatio: 1.5,
    flexDirection: 'row',
    marginBottom: 5,
    padding: 2,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 2,
  },
  profilePicturePost: {
    width: wp('13%'),
    height: hp('7%'),
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: hp('100%'),
    marginLeft: wp('5%'),
  },
  picturePost: {
    width: wp('100%'),
    height: wp('100%'),
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: wp('4%'),
  },
  textStatusPost: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    transform: [{translateY: -hp('5%')}],
    color: '#e00',
  },
  buttonPost: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },
  buttonTextPost: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  containerCard: {
    width: wp('100%'),
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
    minHeight: 359,
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
    padding: 8,
    flexDirection: 'row',
  },
  actionButton1Card: {
    padding: 8,
    height: 36,
  },
  actionText1Card: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  actionButton2Card: {
    padding: 8,
    height: 36,
  },
  actionText2Card: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
});
