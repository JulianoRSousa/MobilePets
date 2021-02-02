import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function PetLogo(props) {
  if(props.petName){
    return (
      <TouchableOpacity onPress={props.onPress} style={props.style}>
     <Text style={{color:'white', fontSize:wp('5%'), marginHorizontal:10, marginVertical:5}}>{props.petName}</Text>
     </TouchableOpacity>
    )
  }else{
    return(
      <View></View>
    )
  }
}
