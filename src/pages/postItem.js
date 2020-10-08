
import React from 'react'
import { View, Image, StyleSheet} from 'react-native';
import { Text } from 'react-native'


export default function postItem({ post }) {
  return (
    <View style={styles.Container}>
      <Image style={styles.ProductImage}
        source={{ uri: postagem.picture_url}}
      />
      <View style={styles.InfoContainer}>
        <Text style={styles.ProductName}>{'post.pet'}</Text>
        <Text>User {'post._id'}</Text>
        <Text>Pet {'post.pet'}</Text>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    elevation: 3,
    flexDirection: 'row',
    borderRadius: 3,
    margin: 10,
    padding: 10,
  },

  ProductImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },

  InfoContainer: {
    flexDirection: 'column',
    marginTop: 5,
    marginLeft: 10,
  },
  ProductName: {
    fontWeight: 'bold',
    fontSize: 14,
  }
})