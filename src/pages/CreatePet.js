import React, {Component, useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  StyleSheet,
  View,
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
import PetLogo from '../components/PetLogo';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import NormalButton from '../components/NormalButtons';
import UserLogo from '../components/UserLogo';
import StatusLogo from '../components/StatusLogo';
import FormData from 'form-data';

export default function createPost({navigation}) {
  const [step, setStep] = uSeState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [color, setColor] = useState('black');
  const [coatSize, setCoatSize] = useState('small');
  const [birthdate, setBirthdate] = useState();
  const [male, setMale] = useState(true);
  const [subStep, setSubStep] = useState(0);

  function nextStep() {
    setStep(step + 1);
    return;
  }

  function previousStep() {
    if (step >> 1) {
      setStep(step - 1);
    } else {
      navigation.navigate('Feed');
    }
    return;
  }

  async function createPet() {
    const img = {
      uri: 'file://' + file.path,
      type: file.type,
      name: file.fileName || file.path.substr(file.path.lastIndexOf('/') + 1),
    };
    const data = new FormData();

    data.append('picture', img);
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('color', color);
    data.append('coatSize', coatSize);
    data.append('bithdate', bithdate);
    data.append('male', male);

    await api
      .post('/createPet', data, {
        headers: {
          token: await AsyncStorage.getItem('token'),
        },
      })
      .then(alertPost());
  }

  function alertPost() {
    return (
      <View>
        {Alert.alert(
          'Parabéns',
          'Pet adicionado com sucesso',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('Feed');
              },
            },
          ],
          {cancelable: false},
        )}
      </View>
    );
  }

  function launchCamera() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'Pets',
        saveToPhotos: true,
      },
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        setSubStep(2);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        setSubStep(2);
      } else {
        setFile(response);
      }
    });
  }

  function chooseImage() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'Pets',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        setSubStep(2);
      } else if (response.error) {
        setSubStep(2);
      } else {
        setFile(response);
      }
    });
  }

  function selectImage() {
    if (file) {
      nextStep();
    } else {
      if (subStep != 1) {
        return (
          <View>
            {Alert.alert(
              'Imagem não selecionada',
              'Precisamos de uma imagem do pet para prosseguirmos',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    setSubStep(1);
                  },
                },
              ],
              {cancelable: false},
            )}
          </View>
        );
      }
    }
  }

  function stepOne() {
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
              onPress={() => launchCamera()}
            />
          </View>
          <View style={styles.viewContainer}>
            <NormalButton
              icon={'folder-multiple-image'}
              title={'Escolher Imagem'}
              onPress={() => chooseImage()}
            />
          </View>
        </View>
        <View style={styles.viewContainer}>{selectImage()}</View>
      </View>
    );
  }

  function stepTwo() {
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
            selectedValue={status}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              setStatus(itemValue);
            }}>
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
              setStep(1);
              setSubStep(1);
              setDescription(null);
              setStatus(1);
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
              nextStep();
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

  function stepThree() {
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
            onChangeText={value => setDescription(value)}
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
              setStep(2);
              setSubStep(1);
              setDescription(null);
              setStatus(1);
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
              setStep(4);
              setSubStep(1);
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

  function stepFour() {
    if (status == 2) {
      return (
        <View style={styles.containerCard}>
          <View>
            <Text>Escolha o pet</Text>
          </View>
          <View>{loadPets()}</View>
        </View>
      );
    } else {
      return (
        <View style={styles.containerCard}>
          <Image
            source={{uri: file.uri}}
            style={styles.cardItemImagePlaceCard}
          />
          <PetLogo
            onPress={() => {
              goToPet();
            }}
            petName={petInfo.name}
            style={styles.PetName}
          />
          <View style={styles.ViewContentDescription}>
            <Text style={styles.subtitleStyleCard}>{description}</Text>
          </View>

          <View style={styles.cardBodyCard}>
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
                <StatusLogo status={status} />
              </View>
              <View style={styles.InternTextCard}>
                <UserLogo
                  title={userInfo}
                  onPress={() => {
                    goToUser();
                  }}
                  source={file.uri}
                />
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  if (step == 1) {
    return (
      <View style={styles.container}>
        <View>{stepOne()}</View>
      </View>
    );
  } else if (step == 2) {
    return (
      <View style={styles.container}>
        <View>{stepTwo()}</View>
      </View>
    );
  } else if (step == 3) {
    return <View style={styles.container}>{stepThree()}</View>;
  } else if (step == 4) {
    return (
      <View style={styles.container}>
        <View>{stepFour()}</View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('70%'),
          }}>
          <TouchableOpacity
            onPress={() => {
              setStep(3);
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
            onPress={() => createPost()}
          />
        </View>
      </View>
    );
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
  PetName: {
    backgroundColor: '#0003',
    position: 'absolute',
    top: wp('76%'),
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
    justifyContent: 'center',
    alignItems: 'center',
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
    height: wp('120%'),
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
    width: wp('100%'),
    height: wp('100%'),
  },
  cardBodyCard: {
    position: 'absolute',
    top: wp('86%'),
    backgroundColor: 'rgba(0,0,0,0.2)',
    left: 0,
    right: 0,
    height: wp('14%'),
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
    color: '#000',
    lineHeight: 16,
    opacity: 0.5,
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
  ViewContentDescription: {
    backgroundColor: '#ddd2',
    position: 'absolute',
    top: wp('100%'),
  },
});
