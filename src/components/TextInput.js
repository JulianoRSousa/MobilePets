import React, {useState, useEffect} from 'react';
import {TextInput, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TextInputPets(props) {
  const [sizeHeight, setSizeHeight] = useState(wp('8%'));
  const [sizeWidth, setSizeWidth] = useState(wp('80%'));
  const [textColor, setTextColor] = useState('black');
  const [text, setText] = useState('');
  const [placeHolderColor, setPlaceHolderColor] = useState('gray');
  const [placeHolder, setPlaceHolder] = useState('');
  const [lineColor, setLineColor] = useState('gray');
  const [radius, setRadius] = useState(25);
  const [backgroundColor, setBackgroundColor] = useState('red');
  const [icon, setIcon] = useState('user');
  const [iconColor, setIconColor] = useState('black');
  const [borderColor, setBorderColor] = useState('black');
  const [borderWidth, setBorderWidth] = useState(0);
  const [sizeIcon, setSizeIcon] = useState(0);

  useEffect(() => {
    if (props.height) {
      setSizeHeight(wp(props.height + '%'));
    }
    if (props.width) {
      setSizeWidth(wp(props.width + '%'));
    }
    if (props.text) {
      setText(props.text);
    }
    if (props.textColor) {
      setTextColor(props.textColor);
    }
    if (props.placeHolderColor) {
      setPlaceHolderColor(props.placeHolderColor);
    }
    if (props.placeHolder) {
      setPlaceHolder(props.placeHolder);
    }
    if (props.lineColor) {
      setLineColor(props.lineColor);
    }
    if (props.radius) {
      setRadius(props.radius);
    }
    if (props.backgroundColor) {
      setBackgroundColor(props.backgroundColor);
    }
    if (props.icon) {
      setIcon(props.icon);
    }
    if (props.iconColor) {
      setIconColor(props.iconColor);
    }
    if (props.borderColor) {
      setBorderColor(props.BorderColor);
    }
    if (props.borderWidth) {
      setBorderWidth(props.borderWidth);
    }
    if (props.sizeIcon) {
      setSizeIcon(props.sizeIcon);
    }
  });

  function renderTextInput() {
    return (
      <View
        style={{
          backgroundColor: backgroundColor,
          borderRadius: radius,
          borderColor: borderColor,
          borderWidth: borderWidth,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: 15,
          height: sizeHeight,
          width: sizeWidth,
        }}>
        <Icon style={{
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              borderLeftWidth: 1,
              borderColor: '#2224',
              paddingHorizontal: sizeIcon / 8,
            }}
            name={props.name}
            color={props.iconColor}
            size={sizeIcon}
            />
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor={placeHolderColor}
          autoFocus={true}
          underlineColorAndroid={lineColor}
          onChangeText={props.onChangeText}
          value={text}
          style={{color: textColor}}
          >
        </TextInput>
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: sizeHeight,
        width: sizeWidth,
      }}>
      {renderTextInput()}
    </View>
  );
}
