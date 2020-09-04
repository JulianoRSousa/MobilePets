import React, { useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    Picker,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

export default function CreateAccount({ navigation }) {
    const [email, setEmail] = useState(null);
    const [pass1, setPass1] = useState(null)
    const [pass2, setPass2] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [male, setMale] = useState(true);



    async function CreateAccount() {
        if (email == null || fullname == null || pass1 == null || pass1 == null ||
            email == '' || fullname == '' || pass1 == '' || pass1 == '') {
            Alert.alert("", "Um ou mais campos não foram preenchidos")
        } else {
            if (pass1 == pass2) {

                if (pass1.lenght < 6) {
                    Alert.alert("", "Senha muito curta")
                    pass1 = null,
                        pass2 = null
                } else {
                    try {
                        await api.post('/createlogin', {}, {
                            headers: {
                                'email': email,
                                'pass': pass1,
                                'fullname': fullname,
                                'male': male
                            }
                        }).then(async Res => {
                            try {
                                console.log("Conectou ao server")
                                if (Res.data.auth) {
                                    console.log("Começou a salvar no sqLite")
                                    await AsyncStorage.setItem('token', Res.data._id)
                                    await AsyncStorage.setItem('user', Res.data.user._id)
                                    await AsyncStorage.setItem('email', Res.data.user.email)
                                    await AsyncStorage.setItem('firstName', Res.data.user.firstName)
                                    await AsyncStorage.setItem('lastName', Res.data.user.lastName)
                                    await AsyncStorage.setItem('male', Res.data.user.male.toString())

                                    navigation.navigate('Feed');
                                }
                            } catch (error) {
                                console.log("erro =>", error)
                            }

                        }
                        )
                    } catch (error) {
                        if (error.message == "Request failed with status code 404") {
                            Alert.alert("Erro de conexão", "Não conseguimos contactar o servidor")
                        } else {
                            Alert.alert("Erro:", error.message);
                        }
                    }
                }
            } else {
                Alert.alert("Erro", "As senhas não conferem");
                return false;
            }
        }
    }



    return <View style={styles.container}>

        <View>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCompleteType="name"
                autoCorrect={false}
                value={fullname}
                onChangeText={setFullname}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCompleteType="email"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Min 6 caracteres"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCompleteType="password"
                secureTextEntry={true}
                autoCorrect={false}
                value={pass1}
                onChangeText={setPass1}
            />

            <Text style={styles.label}>Repita a senha</Text>
            <TextInput

                style={styles.input}
                placeholder="Repita a senha"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCompleteType="password"
                secureTextEntry={true}
                autoCorrect={false}
                value={pass2}
                onChangeText={setPass2}
            />

            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 17 }}>Sexo:  </Text>
                <Picker
                    selectedValue={male}
                    style={{ height: 50, width: 190 }}
                    onValueChange={(itemValue, itemIndex) => setMale(itemValue)
                    }>
                    <Picker.Item label="Masculino" value={true} />
                    <Picker.Item label="Feminino" value={false} />
                </Picker>
            </View>


            <KeyboardAvoidingView>
                <TouchableOpacity
                    onPress={() => CreateAccount()}
                    style={styles.buttonAccount}>
                    <Text style={styles.buttonText}>Criar uma conta</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 10,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonAccount: {
        height: 42,
        backgroundColor: "#226cd4",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})