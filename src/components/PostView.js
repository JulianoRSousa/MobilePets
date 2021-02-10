import React, {useState, props, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import OptionsMenu from 'react-native-option-menu';
import StatusLogo from '../components/StatusLogo';
import UserLogo from '../components/UserLogo';
import PetLogo from '../components/PetLogo';

export default function PostView({navigation}) {
  const [postlists, setPostlists] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [updateTimes, setUpdateTimes] = useState(0);

  useEffect(() => {
    getUser().then(getData());
  },[updateTimes]);

  async function getData() {
    await api
      .get('/getFeed', {
        headers: {
          token: await AsyncStorage.getItem('token'),
        },
      })
      .then(response => setPostlists(response.data.reverse()));
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
    return <View style={{height: wp('2%'), backgroundColor: '#fff6'}} />;
  }

  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', backgroundColor: 'red'}}>
        <TouchableOpacity style={{flex: 1}}>
          <StatusBar backgroundColor={'#ff8636'} />

          <View style={styles.topLayout}>
            <View style={styles.view1} />

            <View style={styles.userInfo}>
              <Image
                style={styles.picture1}
                source={{
                  uri: userInfo.picture_url,
                }}
              />
              <View>
                <Text style={styles.userNameText}>{userInfo.firstName}</Text>
                <Text style={styles.userInfoText}>144 seguidores</Text>
                <TouchableOpacity>
                  <Text style={styles.userInfoText}> 2 Pets</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.view1} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  //   POST POST POST POST POST POST POST POST POST POST POST POST POST

  const postOptions = (
    <Icon
      name="dots-vertical"
      style={{
        alignContent: 'flex-end',
        backgroundColor: '#0001',
        paddingLeft: wp('2%'),
        paddingBottom: wp('2%'),
        borderBottomLeftRadius: wp('8%'),
      }}
      size={hp('3%')}
      color="#000"
    />
  );

  function follow(user) {
    console.log('Seguindo ', user);
  }

  return (
    <View style={styles.container}>
      <FlatList
        extraData={postlists}
        navigation={navigation}
        ListHeaderComponent={renderHeader}
        data={postlists}
        vertical
        ItemSeparatorComponent={separator}
        keyExtractor={post => post.post_id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.containerCard}>
            <Image
              source={{uri: item.post_picture}}
              style={styles.cardItemImagePlaceCard}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row-reverse',
                marginStart: wp('1.5%'),
                position: 'absolute',
                right: 0,
                top: 0,
                borderRadius: 0,
              }}>
              <OptionsMenu
                customButton={postOptions}
                destructiveIndex={1}
                options={['Seguir ' + item.user_name, 'Denunciar post']}
                actions={[
                  () => follow(item.user_name),
                  () => console.log('Denunciar post'),
                ]}
              />
            </View>
            <PetLogo
              onPress={() => console.log('Pet Name: ', item.pet_name)}
              petName={item.pet_name}
              style={styles.PetName}
            />
            <View style={styles.ViewContentDescription}>
              <Text style={styles.subtitleStyleCard}>
                {item.post_description}
              </Text>
            </View>

            <View style={styles.cardBodyCard}>
              <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                <View style={styles.InternBodyCard}>
                  <TouchableOpacity style={styles.actionButton1Card}>
                    <Icon name={'heart'} color={'white'} size={wp('8%')} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton1Card}>
                    <Icon name={'comment'} color={'white'} size={wp('8%')} />
                  </TouchableOpacity>
                </View>
                <View style={styles.InternTextCard}>
                  <StatusLogo status={item.post_status} />
                </View>
                <View style={styles.InternTextCard}>
                  <UserLogo
                    title={item.user_name}
                    onPress={() => {
                      console.log('onpress');
                    }}
                    source={item.user_picture}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#fff0',
          position: 'absolute',
          right: 0,
          top: 0,
        }}
        
        onPress={() => {setUpdateTimes(updateTimes+1)}}>
        <Icon
          name="refresh"
          style={{
            alignContent: 'flex-end',
            marginHorizontal: wp('2%'),
            marginVertical: wp('2%'),
          }}
          size={hp('5%')}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  ViewContentDescription: {
    backgroundColor: '#ddd2',
    position: 'absolute',
    top: wp('100%'),
  },
  PetName: {
    backgroundColor: '#0003',
    position: 'absolute',
    top: wp('76%'),
  },
  topLayout: {
    backgroundColor: '#ff8636',
    paddingBottom: 10,
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
  InternBodyCard: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    width: wp('33%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  InternTextCard: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    width: wp('33%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCard: {
    width: wp('100%'),
    height: wp('120%'),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#CCC',
    flexWrap: 'nowrap',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: 'hidden',
  },
  cardItemImagePlaceCard: {
    backgroundColor: '#ccc',
    width: wp('100%'),
    height: wp('100%'),
  },
  cardBodyCard: {
    position: 'absolute',
    top: wp('86%'),
    backgroundColor: 'rgba(0,0,0,0.2)',
    left: 0,
    right: 0,
    height: wp('14%'),
  },
  bodyContentCard: {
    padding: 16,
    paddingTop: 24,
    justifyContent: 'center',
  },
  titleStyleCard: {
    fontSize: 24,
    color: '#FFF',
    paddingBottom: 12,
  },
  subtitleStyleCard: {
    fontSize: 14,
    color: '#000',
    lineHeight: 16,
    opacity: 0.5,
    borderRadius: 30,
  },
  actionBodyCard: {
    padding: 8,
    flexDirection: 'row',
  },
  actionButton1Card: {
    padding: 8,
    height: 36,
  },
  actionText1Card: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  actionButton2Card: {
    padding: 8,
    height: 36,
  },
  actionText2Card: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
});
