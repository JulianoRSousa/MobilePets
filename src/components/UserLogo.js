import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default function UserLogo(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.InternBodyCard}>
      <View
        style={{
          alignContent: 'center',
        }}>
        <Image style={styles.profilePicture} source={{uri: props.source}} />
        <Text
          style={{
            color: 'white',
            fontFamily: 'Chewy-Regular',
            backgroundColor: '#FF8637dd',
            alignContent: 'flex-start',
            paddingLeft: wp('2%'),
            paddingRight: wp('2%'),
            borderRadius: wp('3%'),
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
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
    borderColor: 'red',
    borderRadius: hp('100%'),
    marginLeft: wp('5%'),
  },
});
