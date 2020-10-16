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
              <Image style={styles.picture} source={{uri: item.post_picture}} />
            <View style={{flex: 1, height: wp('7%'), translateY: -wp('99%')}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: wp('5.5%'),
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    color: 'white',
                    marginLeft: hp('2%'),
                    fontFamily: 'Chewy-Regular',
                    backgroundColor: '#FF8637dd',
                    alignContent: 'flex-start',
                    paddingLeft: wp('2%'),
                    paddingRight: wp('2%'),
                    borderRadius: wp('3%'),
                    borderTopLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}>
                  {item.pet_name}
                </Text>
                <View style={{flex: 1, flexDirection: 'row-reverse', marginStart: wp('1.5%')}}>
                  <Icon
                    name="dots-vertical"
                    style={{
                      alignContent: 'flex-end',
                      backgroundColor: '#0002',
                      borderRadius: wp('4%'),
                      paddingLeft: wp('1%'),
                      paddingRight: wp('1%'),
                    }}
                    size={hp('3%')}
                    color="#000"
                  />
                </View>
              </View>
            </View>

            <View style={{marginBottom: 30}}>
              <View
                style={{
                  borderBottomColor: '#000',
                  borderBottomWidth: 1,
                  borderBottomStartRadius: wp('4%'),
                  borderBottomEndRadius: wp('4%'),
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#FF863744',
                  transform: [{translateY: -wp('26%')}],
                }}>
                <View
                  style={{
                    alignContent: 'center',
                  }}>
                  <Image
                    style={styles.profilePicture}
                    source={{uri: item.user_picture}}
                  />
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
                    {item.user_name}
                  </Text>
                </View>
                  <Text style={{fontFamily: 'Chewy-Regular', fontSize: wp('5%'), color:'#29f',
                    transform:[{translateX: -wp('7%')}, {translateY: -wp('5%')}]}}>{item.post_status}</Text>
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
    backgroundColor:'red'
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
    height: wp('100%'),
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: wp('4%'),
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
