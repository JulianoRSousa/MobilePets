import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, Button, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import { SafeAreaView, } from 'react-navigation';




import PostView from '../components/PostView';



export default function Feed({ navigation }) {


    async function getData() {
        await api.get('/getallposts')
    }

    useEffect(() => {

        getData();
        console.log("useEffect Feed page is ready!");

    }, [])

    async function logout() {
        await api.delete('/deleteauth', {
            headers: {
                token: await AsyncStorage.getItem('token')
            }
        })
        await AsyncStorage.setItem('token', '000000000000000000000000')
        await AsyncStorage.setItem('user', '000000000000000000000000')
        await AsyncStorage.setItem('email', '000000000000000000000000')
        await AsyncStorage.setItem('firstName', '000000000000000000000000')
        await AsyncStorage.setItem('lastName', '000000000000000000000000')
        await AsyncStorage.setItem('male', true.toString())
        navigation.navigate('Login');

    }
    
    function navegador(){
        navigation.navigate('CreatePost');
    }




    return <SafeAreaView style={styles.container}>


        <View>
        <View style={{ borderWidth: 2, flexDirection: 'row', backgroundColor:"#ff8636" }}>
            <Text>Tela FEED</Text>
        </View>
        <View style={{ borderWidth: 2, flexDirection: 'row', backgroundColor:"#ff8636" }}>
            <Button title="Criar um post" onPress={navegador}></Button>
        </View>
        </View>

        <PostView key={''}></PostView>





        <Button title="LogOut" onPress={logout}></Button>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        height: 42,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }
})