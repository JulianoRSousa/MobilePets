import React from 'react';
import {StatusBar, SafeAreaView, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
export default function Seach({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ff8636'}}>
      <StatusBar backgroundColor={'#ff8636'} />
      <Text
        style={{
          alignSelf: 'center',
          fontSize: wp('10%'),
          paddingTop: wp('20%'),
          color: 'white',
          fontFamily: 'Chewy-Regular',
        }}>
        Buscar
      </Text>
    </SafeAreaView>
  );
}
