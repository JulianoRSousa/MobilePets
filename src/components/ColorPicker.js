import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ColorPicker(props) {
  const [sizeHeight, setSizeHeight] = useState(wp('8%'));
  const [sizeWidth, setSizeWidht] = useState(wp('80%'));
  const [textColor, setTextColor] = useState('black');
  const [pressed, setPressed] = useState(false);
  const [selectedColor, setSelectedColor] = useState('Selecione a cor do pet');
  const [backgroundColor, setBackgroundColor] = useState('white');

  useEffect(() => {
    if (props.height) {
      setSizeHeight(wp(props.height + '%'));
    }
    if (props.width) {
      setSizeWidht(wp(props.width + '%'));
    }
    if (props.textColor) {
      setTextColor(props.textColor);
    }
    if (props.backgroundColor) {
      setBackgroundColor(props.backgroundColor);
    }
  });

  function showColors() {
    if (pressed) {
      return (
        <View
          style={{
            backgroundColor: backgroundColor,
            height: sizeWidth,
            width: sizeWidth,
            flexDirection: 'row',
            position: 'absolute',
            top: sizeHeight,
          }}>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                height: sizeWidth / 3,
                width: sizeWidth / 3,
              }}
              onPress={() => {
                setSelectedColor('black'), setPressed(false);
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                height: sizeWidth / 3,
                width: sizeWidth / 3,
              }}
              onPress={() => {
                setSelectedColor('white'), setPressed(false);
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'gray',
                height: sizeWidth / 3,
                width: sizeWidth / 3,
              }}
              onPress={() => {
                setSelectedColor('gray'), setPressed(false);
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                height: sizeWidth / 3,
                width: sizeWidth / 3,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                height: sizeWidth / 3,
                width: sizeWidth / 3,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                height: sizeWidth / 3,
                width: sizeWidth / 3,
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                height: sizeWidth / 3,
                width: sizeWidth / 3,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                height: sizeWidth / 3,
                width: sizeWidth / 3,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                height: sizeWidth / 3,
                width: sizeWidth / 3,
              }}
            />
          </View>
        </View>
      );
    } else {
      return;
    }
  }

  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#2224',
          borderRadius: 4,
          flexDirection: 'row',
          height: sizeHeight,
          width: sizeWidth,
          backgroundColor: backgroundColor,
        }}>
        <Text
          style={{
            flex: 1,
            textAlign: 'left',
            paddingHorizontal: sizeHeight / 4,
            justifyContent: 'center',
            color: textColor + '',
            fontSize: sizeHeight / 2,
          }}>
          {selectedColor}
        </Text>
        <TouchableOpacity
          onPress={() => {
            pressed ? setPressed(false) : setPressed(true);
          }}>
          <Icon
            style={{
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              borderLeftWidth: 1,
              borderColor: '#2224',
              borderRadius: sizeHeight / 1.5,
              paddingHorizontal: sizeHeight / 8,
            }}
            name={'arrow-down-drop-circle'}
            color={props.iconColor}
            size={sizeHeight / 1.2}
          />
        </TouchableOpacity>
      </View>
      {showColors()}
    </View>
  );
}
