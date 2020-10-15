import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

export default function PostView({}) {
  const [postlists, setPostlists] = useState([]);

  useEffect(() => {
    async function getData() {
            await api
              .get('/getFeed', {
                headers: {
                  token: await AsyncStorage.getItem('token'),
                },
              })
              .then(response => setPostlists(response.data));
            }
   /* async function getData() {
      const feed = await api.get('/getFeed', {
        headers: {
          token: await AsyncStorage.getItem('token'),
        },
      });

      const data = await Promise.all(feed.data);
      //   console.log('>>>>>>>>>>> ',data)
      //setPostlists(data.reduce((obj, item) => ((obj[item._id] = item._id, [item.user] = item.user), obj),{}))
     
      var result = {};
      for(var i = 0; i < data.length; i++) {
        result[data[i]] = data;
      }
      console.log(result)
    }*/
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={postlists}
        vertical
        keyExtractor={post => post.post_id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.container}>
            <View style={{flex: 1, height: hp('8%')}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, alignSelf: 'center'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'left',
                      textAlignVertical: 'center',
                      color: 'red',
                      marginLeft: hp('2%'),
                    }}>
                    {item.pet_name}
                  </Text>
                </View>
                <Icon name="menu-down" size={hp('5%')} color="#000" />
              </View>
            </View>
            <Image style={styles.picture} source={{uri: item.post_picture}} />

            <View style={{marginBottom: 30}}>
              <View
                style={{
                  borderBottomColor: '#000',
                  borderBottomWidth: 1,
                  borderBottomStartRadius: 20,
                  borderBottomEndRadius: 20,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    alignContent: 'center',
                    transform: [{translateY: -hp('5%')}],
                  }}>
                  <Image
                    style={styles.profilePicture}
                    source={{uri: item.user_picture}}
                  />
                  <Text>{item.user_name}</Text>
                </View>
                <View
                  style={styles.view2}>
                  <Text style={styles.textStatus}>{item.post_status}</Text>
                </View>
              </View>
              <Text style={styles.price}>{item.post_description}</Text>
              <Text style={styles.price}>{item.user_name}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  view2: {
    paddingHorizontal: 6,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    transform: [{translateY: hp('3%')}],
    flexDirection: 'row',
    flex: 1,
  },
  listItem: {
    aspectRatio: 1.5,
    flexDirection: 'row',
    marginBottom: 5,
    padding: 2,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 2,
  },
  profilePicture: {
    width: wp('13%'),
    height: hp('7%'),
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: hp('100%'),
    marginLeft: wp('5%'),
  },
  picture: {
    width: wp('100%'),
    height: hp('70%'),
    resizeMode: 'cover',
  },
  textStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    transform: [{translateY: -hp('5%')}],
    color: '#e00',
  },
  price: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
