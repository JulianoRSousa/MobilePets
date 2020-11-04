import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Button,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import navigation from '../pages/Feed';
import ImagePicker from 'react-native-image-picker';
import OptionsMenu from 'react-native-option-menu';

export default function PostView({navigation}) {
  const [postlists, setPostlists] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    getUser();
    getData();
    console.log('está em post View');
  }, []);

  async function getData() {
    await api
      .get('/getFeed', {
        headers: {
          token: await AsyncStorage.getItem('token'),
        },
      })
      .then(response => setPostlists(response.data));
      console.log("data >>>>>> ", postlists);
  }

  async function getUser() {
    await api
      .get('/loadUser', {
        headers: {
          token: await AsyncStorage.getItem('token'),
        },
      })
      .then(response => setUserInfo(response.data));
  }

  function separator() {
    return <View style={{height: wp('4%'), backgroundColor: 'red'}} />;
  }

  function renderHeader() {
    return (
      <View>
        <StatusBar backgroundColor={'#ff8636'} />

        <View style={styles.topLayout}>
          <View style={styles.view1} />

          <TouchableOpacity style={styles.userInfo}>
            <Image
              style={styles.picture1}
              source={{
                uri: userInfo.picture_url,
              }}
            />
            <View>
              <Text style={styles.userNameText}>{userInfo.firstName}</Text>
              <Text style={styles.userInfoText}>144 seguidores</Text>
              <Text style={styles.userInfoText}> 2 Pets</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.view1} />
        </View>
      </View>
    );
  }

  //   POST POST POST POST POST POST POST POST POST POST POST POST POST

  const postOptions = (
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
  );

  function follow(user){
    console.log('Seguindo ', user);
  }

  return (
     <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        
        data={postlists}
        vertical
        keyExtractor={post => post.post_id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.container1}>
            <Image style={styles.picture} source={{uri: item.post_picture}} />
            <View style={{flex: 1, height: wp('7%'), translateY: -wp('99%')}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.petName}>{item.pet_name}</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row-reverse',
                    marginStart: wp('1.5%'),
                  }}>
                  <OptionsMenu
                    customButton={postOptions}
                    destructiveIndex={1}
                    options={[('Seguir '+item.user_name),'Denunciar']}
                    actions={[() => follow(item.user_name),
                      () => console.log('Denunciar'),
                    ]}
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
                <Text
                  style={{
                    fontFamily: 'Chewy-Regular',
                    fontSize: wp('5%'),
                    color: '#29f',
                    transform: [
                      {translateX: -wp('7%')},
                      {translateY: -wp('5%')},
                    ],
                  }}>
                  {item.post_status}
                </Text>
              </View>
              <Text>{item.post_description}</Text>
            </View>
          </View>
        )}
      />
    </View>
   
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  topLayout: {
    backgroundColor: '#ff8636',
    margin: 0,
    borderBottomEndRadius: wp('5%'),
    borderBottomStartRadius: wp('5%'),
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picture1: {
    borderColor: '#0008',
    borderWidth: 1,
    resizeMode: 'cover',
    width: wp('28%'),
    height: wp('28%'),
    borderRadius: wp('8%'),
    margin: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameText: {
    color: 'white',
    fontSize: hp('3.5%'),
    fontFamily: 'Chewy-Regular',
    paddingLeft: wp('2%'),
  },
  userInfoText: {
    color: 'white',
    fontSize: hp('2%'),
    fontFamily: 'Chewy-Regular',
    paddingLeft: wp('2%'),
  },
  view1: {
    flexDirection: 'row',
    backgroundColor: '#ff8636',
  },
  view2: {
    flex: 1,
    backgroundColor: '#eeeeee',
    flexDirection: 'row',
  },
  petName: {
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
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
  },
  button: {
    height: 42,
    backgroundColor: 'red',
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
  container: {
    flex: 1,
  },
  view2: {
    paddingHorizontal: 6,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    transform: [{translateY: hp('3%')}],
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'red',
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
