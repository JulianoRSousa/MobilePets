import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  export default function PetsNormalButton(props){
    return(
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
    <Text style={styles.buttonText}>{props.title}</Text>
    <Icon
      name={props.icon}
      color={'white'}
      size={wp('6%')}/>
  </TouchableOpacity>
  )}

  

  
const styles = StyleSheet.create({
  button: {
    height: wp('18%'),
    borderWidth: 1.5,
    borderColor: 'white',
    backgroundColor: '#258DEC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 6,
    shadowOpacity: 0.35,
    shadowRadius: 2,
    overflow: "visible"
  },
  buttonText: {
    fontSize: wp('4.4%'),
    fontWeight: 'bold',
    color: 'white',
  },
});
