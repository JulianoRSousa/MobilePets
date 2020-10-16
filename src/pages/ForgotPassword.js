import React, { useState, useEffect } from 'react';
import { Image, Text, StyleSheet, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import logo from '../assets/logo.png';
import { SafeAreaView } from 'react-navigation';
import SpotList from '../components/SpotList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Login from '../pages/Login';
import { KeyboardAvoidingView } from 'react-native';

export default function ForgotPassword({ navigation }) {
    const [ email , setEmail ] = useState('');

    function navegar(){
        navigation.navigate('Login')
    }

    return <SafeAreaView style={ styles.container}>
        <KeyboardAvoidingView
            behavior="height"
            style={styles.form}>
            <Text style={styles.label}>Digite seu Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                secureTextEntry={true}
                value={email}
                onChangeText={setEmail}
            />
        <Button title={'Resetar Senha'} onPress={() => navegar} />
        </KeyboardAvoidingView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF8637'
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#FF8637',
        height: 44,
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },
    label: {
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
})