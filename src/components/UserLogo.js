import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function UserLogo(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={{flex:1}}>
      <View
        style={{
          alignItems:'flex-start',
          flexDirection:'row',
        }}>
        <Image style={styles.profilePicture} source={{uri: props.source}} />
        <Text
          style={{
            color: 'white',
            justifyContent:'center'
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profilePicture: {
    width: wp('13%'),
    height: hp('7%'),
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: '#0a0a',
    borderRadius: hp('100%'),
    marginLeft: wp('5%'),
  },
});
