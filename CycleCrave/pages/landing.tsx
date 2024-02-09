import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const landing = ({ navigation }: RouterProps) => {
    const logo = require('../assets/CycleCraveLogo.png');

    return (
        <View style={styles.container}>
            <Image source={logo} resizeMode="contain" style={styles.logo}></Image>
            <Text style={styles.name}>CycleCrave</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignUp")}>
                <Text>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF4F3',
    },
    name: {
        fontSize: 40,
        color: "#FF898D",
        fontFamily: 'HelveticaNeue',
    },
    button: {
        width: '45%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#FEDBD5",
        borderColor: "#FF898D",
        marginTop: 50,
    },
    logo: {
        maxHeight: 400,
        maxWidth: 400,
        marginTop: -40,
        marginBottom: 10,
    },
});

export default landing;