import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function SpotList({ tech }) {

    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const response = await api.get('/getallposts')

            setSpots(response.data);

        }

        getPosts();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Empresas de usam <Text style={styles.title, styles.bold}>{tech}</Text></Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={post => post._id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image styles={styles.thumbnail} source={{ uri: item.piture }} />
                        <Text style={styles.company}>{item.status}</Text>
                        <Text style={styles.price}>{item.description}</Text>
                        <Text style={styles.price}>{item.user}</Text>
                        <TouchableOpacity onPress={() => { }} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        marginBottom: 15,
        color: "#444",
        paddingHorizontal: 20,
    },
    bold: {
        fontWeight: 'bold',
    },
    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,
    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'center',
        borderRadius: 2,
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    price: {
        fontSize: 12,
        color: '#999',
        marginTop: 5
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