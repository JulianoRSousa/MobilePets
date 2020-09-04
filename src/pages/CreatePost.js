import React, { useState, useEffect  } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Picker,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

export default function CreatePost({ navigation }) {
    var teste= 'nome';
    const [email, setEmail] = useState(null);
    const [user, setUser] = useState('')
    const [pass1, setPass1] = useState(null)
    const [pass2, setPass2] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [male, setMale] = useState(true);

    function updateUser(){
        setUser(teste)
    }

    useEffect(() => {

        console.log("useEffect CreatePost page is ready!");

    }, [])

    async function CreatePost() {
    }



    return <View style={styles.container}>

        <View>
            <Text style={styles.label}>Nome Completo</Text>
            <Picker selectedValue = {teste} onValueChange = {updateUser}>
               <Picker.Item label = "Steve" value = "steve"  />
               <Picker.Item label = "Ellen" value = "ellen" />
               <Picker.Item label = "Adicionar Pet" value = "maria" color={"#00f"}  />
            </Picker>

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
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
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