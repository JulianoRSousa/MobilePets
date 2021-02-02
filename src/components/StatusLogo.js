import React from 'react';
import {
  View,
  Text,
} from 'react-native';

export default function StatusLogo(props) {
  var status = props.status;
  if (status == 2 || status == 'Lost') {
    return (
    <View>
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
  } else  if (status == 1 || status == 'Found') {
    return (
    <View>
      <Text
        style={{
          color: '#0f09',
          fontFamily: 'Chewy-Regular',
          alignContent: 'flex-start',
        }}>
        Encontrado
      </Text>
    </View>
    )
  } else {
    return (
    <View>
    </View>
    )
  }
}
