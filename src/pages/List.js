import React, { useState, useEffect } from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import logo from '../assets/logo.png';
import { SafeAreaView } from 'react-navigation';
import SpotList from '../components/SpotList';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function List({ navigation }) {

    const [ techs, setTechs ] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, [])

       function logout(){
        navigation.navigate('Login');
       }

    return <SafeAreaView style={ styles.container}>
        <Image style={styles.logo} source={logo}/>

        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
        
        <TouchableOpacity onPress={logout} style={styles.button}>
            <Text style={styles.buttonText}>LogOut</Text>
        </TouchableOpacity>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 30,
    },
    button: {
        height: 42,
        backgroundColor: "#f05a5b",
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