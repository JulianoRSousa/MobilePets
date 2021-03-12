import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Modal,
  UIManager,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PetsMenu(props) {
  const [iconSize, setIconSize] = useState(wp('10%'));
  const [iconName, setIconName] = useState('menu');
  const [iconColor, setIconColor] = useState('white');
  const [pressed, setPressed] = useState(false);
  const [menuTags, setMenuTags] = useState(['Add a menuTags={""}']);
  const [placeHolderColor, setPlaceHolderColor] = useState('gray');
  const [placeHolder, setPlaceHolder] = useState('');
  const [lineColor, setLineColor] = useState('gray');
  const [radius, setRadius] = useState(25);
  const [backgroundColor, setBackgroundColor] = useState('red');
  const [icon, setIcon] = useState('user');
  const [borderColor, setBorderColor] = useState('black');
  const [borderWidth, setBorderWidth] = useState(0);
  const [sizeIcon, setSizeIcon] = useState(0);
  var i;

  useEffect(() => {
    if (props.iconSize) {
      setIconSize(wp(props.iconSize + '%'));
    }
    if (props.iconName) {
      setIconName(props.iconName);
    }
    if (props.iconColor) {
      setIconColor(props.iconColor);
    }
    if (props.menuTags) {
      setMenuTags(props.menuTags);
    }
  });

  const handleClick = index => {    
    for (var i = 0; i < menuTags.length; i++) {
        if (index === i) {
          if (index === menuTags.length - 1) {
            setPressed(false)
          } else {
            if (props.actions[i] !== null) {
              props.actions[i]();
            }
          }
        }
      }
}

  function menu() {
    if (pressed) {
      return (
        <View
          onTouchStart={() => setPressed(false)}
          style={{
            width: wp('50%'),
            elevation: 3,
            backgroundColor: 'yellow',
          }}>
          {menuTags.map((tag, index) => {
        return (
          <View key={tag}>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => handleClick(index)}
            >
              <Text style={{ textAlign: "center" }}>{tag}</Text>
            </TouchableOpacity>

            {index < menuTags.length - 1 && (
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "lightgray"
                }}
              />
            )}
          </View>
        );
      })}
        </View>
      );
    } else {
      return;
    }
  }

  return (
    <View>
      <Icon
        name={iconName}
        color={iconColor}
        size={iconSize}
        onPress={() => {
          pressed ? setPressed(false) : setPressed(true);
        }}
      />
      <Modal
        visible={pressed}
        transparent={true}
          animationType={'fade'}
        style={{backgroundColor: 'green'}}>
        <TouchableOpacity
        style={{backgroundColor:'red'}}
         onMagicTap={()=>setPressed(false)}>
        {menu()}
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBackup: {
    height: wp('18%'),
  },
});
