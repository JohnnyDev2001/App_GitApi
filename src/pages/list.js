import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, Image, View, AsyncStorage, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import logout from "../../assets/logout.png";

import api from "../services/api";
import Spots from "../components/spots";

export default function List({ navigation }){
    const [user, setUser] = useState('');
    const [avatar, setAvatar] = useState('../../assets/foto.png');
    const [login, setLogin] = useState('');
    const [ID, setID] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(userIND => {
            const user = userIND;
            setUser(user);
        });
        
        async function WhenStart(){
                const response = await api.get('/users/'+user);

                const photo = response.data.avatar_url;
                const login = response.data.login;
                const id = JSON.stringify(response.data.id);
                const name = response.data.name;

                setAvatar(photo);
                setLogin(login);
                setID(id);
                setName(name);
        }

        WhenStart();
    }, [user, avatar, login, ID, name]);

    function logOut(){
        AsyncStorage.clear();
        navigation.navigate('Login'); 
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.topo}>
                <View style={styles.viewImage}><Image style={styles.image} source={{uri: avatar}}/></View>
                <View style={styles.viewInfo}>
                    <Text style={styles.texto}>ID: {ID}</Text>
                    <Text style={styles.texto}>Login: {login}</Text>
                    <Text style={styles.texto}>Name: {name}</Text>
                </View>
                <TouchableOpacity style={styles.buttonLogout} onPress={logOut}><Image source={logout} style={styles.iconLogout} /></TouchableOpacity>
            </View>
            <SafeAreaView style={{flex: 1}}>
                {<Spots style={{flex: 1}}/>}
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    topo:{
        height: 200,
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        borderBottomWidth: 2,
        borderBottomColor: '#b3b3b3',
    },
    viewImage:{
        width: '35%',
        height: 150,
        marginHorizontal: 10,
        marginTop: 35,
    },
    image:{
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        borderRadius: 2,
    },
    viewInfo:{
        width: '45%',
        marginHorizontal: 10,
        marginTop: 50,
    },
    texto:{
        fontSize: 15,
        paddingBottom: 8,
        color: '#b3b3b3'
    },
    buttonLogout:{
        width: 25,
        height: 30,
        marginHorizontal: 2,
        backgroundColor: '#99ff99',
        borderRadius: 15,
        marginTop: 30,
    },
    iconLogout:{
        width: 25,
        height: 30,
        resizeMode: 'contain',
        alignSelf: 'center',
    }
});