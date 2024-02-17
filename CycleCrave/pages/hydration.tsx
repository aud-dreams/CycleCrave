import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import { Button } from 'react-native-paper';

import CircularProgress from 'react-native-circular-progress-indicator';

const hydration = () => {
    // declare state variable called progressValue using the useState hook
    // useState hook returns array w 2 elems, curr state value (progressValue) & func to update that value (setProgressValue)
    // set progressValue to 0
    const [progressValue, setProgressValue] = useState(0);

    // calls setProgressValue to update progressValue w/ amount
    const incrementProgressBar = (amount) => {
        setProgressValue(progressValue + amount);
    };

    // const resetProgressBar = () => {
    //     setProgressValue(0);
    // };

    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <CircularProgress
                    value={progressValue}
                    radius={90}
                    duration={500}
                    progressValueColor={'black'}
                    maxValue={100}
                    title={'oz'}
                    titleColor={'black'}
                    titleStyle={{ fontWeight: 'bold' }}
                />
            </View>
            <View style={styles.lowerContainer}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.button, styles.lightBlue]} onPress={() => incrementProgressBar(8)}>
                        <Text>8 oz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.mediumBlue]} onPress={() => incrementProgressBar(16)}>
                        <Text>16 oz</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.button, styles.darkBlue]} onPress={() => incrementProgressBar(32)}>
                        <Text>32 oz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.darkestBlue]} onPress={() => incrementProgressBar(64)}>
                        <Text>64 oz</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.button, styles.darkestBlue]} onPress={() => resetProgressBar()}>
                        <Text>Reset</Text>
                    </TouchableOpacity>
                </View> */}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
        backgroundColor: '#FFF4F3'
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
        paddingVertical: 15, // Increase vertical padding to make the button taller
        paddingHorizontal: 30, // Increase horizontal padding to make the button wider
        width: '45%',
        padding: 8,
        margin: 8,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#FEDBD5",
        flex: 1,
        marginHorizontal: 5,
        minWidth: 100, // Set a minimum width for the button

    },

    upperContainer: {
        flex: 6, // takes 2/3 of the screen
        paddingTop: 100,
        justifyContent: 'center'
    },

    lowerContainer: {
        flex: 4, // takes 1/3 of the screen
        justifyContent: 'flex-end', // align content to the bottom
        paddingBottom: 200, // add some padding to create space between the buttons and the bottom
    },
    lightBlue: {
        backgroundColor: "#EEF7FF", // Light blue
        borderColor: "#EEF7FF", // Light blue
    },
    mediumBlue: {
        backgroundColor: "#D2EBFF", // Medium blue
        borderColor: "#D2EBFF", // Light blue
    },
    darkBlue: {
        backgroundColor: "#A5D7FF", // Dark blue
        borderColor: "#A5D7FF", // Light blue
    },
    darkestBlue: {
        backgroundColor: "#75C1FF", // Darkest blue
        borderColor: "#75C1FF", // Light blue
    },

});

export default hydration;