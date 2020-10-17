import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import PostView from '../components/PostView';
export default function Feed({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <PostView />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8636',
  },
  view: {
    flex: 1,
    backgroundColor: '#eeeeee',
    flexDirection: 'row',
  },
});
