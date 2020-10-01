import React, { useState, useEffect } from 'react';
import {
    View, StatusBar, ActivityIndicator, KeyboardAvoidingView,
    Image, Text, StyleSheet, TextInput, TouchableOpacity, Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import CreateAcc from './CreateAccount';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    async function handleSubmit() {
        console.log("iniciou handleSubmit")

        try {
            await api.post('/createauth', {}, {
                headers: {
                    'username': username,
                    'pass': pass
                }
            }).then(async Res => {
                if (Res.data.auth) {
                    await AsyncStorage.setItem('token', Res.data._id)
                    await AsyncStorage.setItem('user', Res.data.user._id)
                    await AsyncStorage.setItem('username', Res.data.user.username)
                    await AsyncStorage.setItem('firstName', Res.data.user.firstName)
                    await AsyncStorage.setItem('lastName', Res.data.user.lastName)
                    await AsyncStorage.setItem('male', Res.data.user.male.toString())
                    navigation.navigate('Feed')
                    console.log("It should be Feed page!");
                }
            })
        } catch (error) {

            if (error.message == "Request failed with status code 404") {
                Alert.alert("Erro de conexão", "Não conseguimos contactar o servidor")
            } else if (error.message == "Request failed with status code 401") {
                Alert.alert('Erro ao Autenticar:',
                    'Nome de usuário ou senha invalida',
                    [
                        { text: 'Tentar novamente', onPress: () => { setPass("") } },
                        {
                            text: 'Esqueci minha senha',
                            onPress: () => {
                                Alert.alert('', 'Uma confirmação foi enviada ao seu email!',
                                    [
                                        { text: 'OK' },
                                        { text: 'Não tenho acesso ao email', onPress: () => { Alert.alert('Direcionamento para site') }, style: 'cancel' }
                                    ], { cancelable: false })
                            },
                            style: 'cancel',
                        }
                    ],
                    { cancelable: false })
            } else {
                Alert.alert("Erro:", error.message)
            }
        }
    }


    return <View style={styles.container}>

        <StatusBar
            barStyle="default"
            hidden={false}
            backgroundColor="#FF8637"
            translucent={false}
            networkActivityIndicatorVisible={true}
        />
        <KeyboardAvoidingView
            behavior="height"
            style={styles.form}>
            <Text style={styles.label}>Usuário</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuário"
                placeholderTextColor="#999"
                keyboardType="default"
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                value={username}
                onChangeText={setUsername}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCompleteType="password"
                autoCorrect={false}
                secureTextEntry={true}
                value={pass}
                onChangeText={setPass}
            />
            <TouchableOpacity
                onPress={() => handleSubmit()}
                style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('CreateAcc')}
                style={styles.buttonAccount}>
                <Text style={styles.buttonText}>Criar uma conta</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF8637'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
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
        borderRadius: 8,
        marginBottom: 4
    },
    buttonAccount: {
        height: 42,
        backgroundColor: "#226cd4",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})