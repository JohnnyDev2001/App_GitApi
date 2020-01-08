import React, { useState, useEffect } from 'react';
import { ScrollView, View, AsyncStorage, FlatList, StyleSheet, Text, Animated } from 'react-native';

import api from '../services/api';

function Spots(){
    const [user, setUser] = useState('');
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(userIND => {
            const user = userIND;
            setUser(user);
        });
        async function loadSpots(){
                const response = await api.get('/users/'+user+'/repos');
                
                await setDocs(response.data);
        }

        loadSpots();
    }, [user, docs]);


    return (
        <View style={styles.container}>
            <FlatList
            style={styles.list}
            data={docs}
            keyExtractor={docs => docs.id}
            showsVerticalScrollIndicator={false}
            
            renderItem={({ item }) => (
                <View style={styles.form}>
                    <View style={styles.nome}><Text style={styles.nomeText}>Name: {item.name}</Text></View>
                    <View style={styles.info}>
                        <Text style={styles.lang}>Language: {item.language}</Text>
                        <Text style={styles.tam}>Size: {item.size}</Text>
                    </View>
                </View>
            )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ccc',
        flex: 1,
    },
    form:{
        height: 100,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 8,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#0099e6",
    },
    nome:{
        alignItems: 'center',
        marginVertical: 10,
    },
    nomeText:{
        fontSize: 15,
        color: '#ccc',
        fontWeight: 'bold',
    },
    info:{
        flexDirection: 'row',
    },
    lang:{
        width: '60%',
        alignSelf: 'center',
        fontSize: 15,
        color: '#ccc',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    tam:{
        width: '40%',
        alignSelf: 'center',
        fontSize: 15,
        color: '#ccc',
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },
    list:{
        flex: 1,
    }

});

export default Spots;