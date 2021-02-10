import React, {Component, useState} from 'react';
import {View, Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default function ImagePicker(props) {

  const image = null;
  const visible = false;

  selectImage = () => {
    if (image) {
      return image;
    } else {
      return (
        <View>
          {Alert.alert(
            'Imagem não selecionada',
            'Precisamos de uma imagem para prosseguirmos',
            [
              {
                text: 'Ok',
                onPress: () => {
                  visible = true;
                },
              },
            ],
            {cancelable: false},
          )}
        </View>
      );
    }
  };

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
        return;
      } else if (response.error) {
        return;
      } else {
        image = response;
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
      if (response.didCancel) {
        this.setState({subStep: 2});
        return;
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        return;
      } else {
        const source = {uri: response.uri};
        image = response;
      }
    });
  };

  pickerClosed = () => {
    <View>
          {Alert.alert(
            'Imagem não selecionada',
            'Precisamos de uma imagem para prosseguirmos',
            [
              {
                text: 'Ok',
                onPress: () => {
                  visible = true;
                },
              },
            ],
            {cancelable: true},
          )}
        </View>
  }


  return image;
}
