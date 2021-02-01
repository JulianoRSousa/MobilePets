import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import api from '../services/api';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function StatusLogo(props) {
  var status = props.status;
  if (status == 2) {
    return (
    <View style={styles.InternBodyCard}>
      <Text
        style={{
          color: 'red',
          fontFamily: 'Chewy-Regular',
          alignContent: 'flex-start',
        }}>
        Perdido
      </Text>
    </View>
    )
  } else  if (status == 1) {
    return (
    <View style={styles.InternBodyCard}>
      <Text
        style={{
          color: 'blue',
          fontFamily: 'Chewy-Regular',
          alignContent: 'flex-start',
        }}>
        Encontrado
      </Text>
    </View>
    )
  } else {
    return (
    <View style={styles.InternBodyCard}>
    </View>
    )
  }
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
