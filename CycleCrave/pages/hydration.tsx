import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import { Button } from 'react-native-paper';

import CircularProgress from 'react-native-circular-progress-indicator';

const hydration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        console.log('Email:', email, 'Password:', password);
    };

    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <CircularProgress
                    value={75}
                    radius={90}
                    duration={2000}
                    progressValueColor={'black'}
                    maxValue={100}
                    title={'oz'}
                    valueSuffix={'%'}
                    titleColor={'black'}
                    titleStyle={{ fontWeight: 'bold' }}
                />
            </View>
            <View style={styles.lowerContainer}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text>8 oz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text>16 oz</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text>32 oz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text>64 oz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
    },
    buttonRow: {
        flexDirection: 'row', // Arrange buttons horizontally
        marginBottom: 10, // Add spacing between rows
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        width: '45%',
        padding: 8,
        margin: 8,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#FEDBD5",
        borderColor: "#FF898D",
        flex: 1,
        marginHorizontal: 5,
        minWidth: 100, // Set a minimum width for the button
    },

    upperContainer: {
        flex: 6, // takes 2/3 of the screen
        // width: 50
    },

    lowerContainer: {
        flex: 4, // takes 1/3 of the screen
        justifyContent: 'flex-end', // align content to the bottom
        paddingBottom: 300, // add some padding to create space between the buttons and the bottom
    }

});

export default hydration;
