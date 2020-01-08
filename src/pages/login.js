import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet
} from "react-native";

import api from "../services/api";

import logo from "../../assets/logo.png";

export default function Login({ navigation }){
    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('id').then(id => {
            if(id){
                navigation.navigate('List'); 
            }
        });
    }, []);

    async function handleSubmit(){
        const response = await api.get('/users/'+user);

        const id = response.data.id;

        await AsyncStorage.setItem('id', JSON.stringify(id));
        await AsyncStorage.setItem('user', user);

        navigation.navigate('List');
    }

    return(
        <KeyboardAvoidingView enabled={Platform.OS === "ios"} style={styles.container}>
            <View style={styles.logoView}>
                <Image source={logo} style={styles.logoImg}/>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Nome de Usuario*</Text>
                <TextInput style={styles.input}
                placeholder="Nome de Usuario"
                autoCapitalize="none"
                autoCorrect={false}
                value={user}
                onChangeText={setUser}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
    },
    logoView:{
        marginTop: 24,
        alignItems: 'center',
        backgroundColor: '#ff751a',
        height: 80,
        marginBottom: 20,
    },
    logoImg:{
        alignSelf: 'center',
        height: 50,
        resizeMode: 'contain',
        marginTop: 13,
    },
    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        justifyContent: 'center',
        marginTop: 100,
    },
    label:{
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#444',
        fontSize: 20,
    },
    input:{
        borderColor: "#ff751a",
        borderWidth: 1,
        borderRadius: 2,
        paddingHorizontal: 20,
        fontSize: 16,
        height: 44,
        marginBottom: 20,
    },
    button:{
        alignItems: 'center',
        height: 40,
        backgroundColor: '#ff1a1a',
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText:{
        alignSelf: 'center',
        marginTop: 5,
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
});