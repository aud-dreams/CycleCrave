import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        console.log('Email:', email, 'Password:', password);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF4F3',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        width: '80%',
        height: 40,
        padding: 10,
        borderWidth: 1,
        marginBottom: 30,
        borderRadius: 10,
        backgroundColor: "#FEDBD5",
        borderColor: "#FF898D",
    },
    button: {
        width: '45%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#FEDBD5",
        borderColor: "#FF898D",
        marginTop: 20,
    }
});

export default SignUp;