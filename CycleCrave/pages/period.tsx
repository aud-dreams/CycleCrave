import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const period = () => {
    const [buttonPressed, setActiveButtons] = useState({});

    const handlePress = (title) => {
        setActiveButtons(prevState => ({
            ...prevState,
            [title]: !prevState[title]
        }));
    };

    const NewButton = ({ title, buttonPressed, handlePress }) => {
        return (
            <TouchableOpacity
                style={[styles.button, buttonPressed ? styles.buttonPressed : styles.defaultButton]}
                onPress={() => handlePress(title)}
            >
                <Text>{title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}> Period </Text>

            <View style={styles.upperContainer}>
                <Text style={styles.section_title}>Symptoms</Text>
                <Text style={styles.section_text}>Select all that apply</Text>
                <View style={styles.card_template}>
                    <View style={styles.buttonContainer}>
                        {/* Map through an array of titles to create a button for each */}
                        {['Mood Swings', 'Headache', 'Period Cramps', 'PMS', 'Bloating', 'Constipation'].map((title) => (
                            <NewButton
                                key={title} // Use a unique key for each button
                                title={title}
                                buttonPressed={!!buttonPressed[title]}
                                handlePress={handlePress}
                            />
                        ))}
                    </View>

                </View>
            </View>
            <View style={styles.lowerContainer}>
                <Text style={styles.section_title}>Cravings</Text>
                <Text style={styles.section_text}>Select all that apply</Text>
                <View style={styles.card_template}>
                    <View style={styles.buttonContainer}>
                        {/* Map through an array of titles to create a button for each */}
                        {['Sweet Cravings', 'Salty Cravings', 'Thirst', 'Fruity Cravings', 'Crispy Cravings'].map((title) => (
                            <NewButton
                                key={title} // Use a unique key for each button
                                title={title}
                                buttonPressed={!!buttonPressed[title]}
                                handlePress={handlePress}
                            />
                        ))}
                    </View>
                </View>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
        backgroundColor: '#FFF4F3'
    },
    allButtons: {
        alignItems: 'center'
    },
    buttonRow: {
        marginTop: 5,
        flexDirection: 'row', // Arrange buttons horizontally
        marginBottom: 2, // Add spacing between rows
        // justifyContent: 'space-between',
        // justifyContent: 'center', // Center items vertically

    },
    buttonContainer: {
        flexDirection: 'row', // Allow button to expand horizontally
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    buttonPressed: {
        backgroundColor: "#FF898D", // Change to darker color when pressed
    },

    defaultButton: {
        backgroundColor: "#FEDBD5", // default button
    },
    header: {
        marginTop: 50,
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },

    upperContainer: {
        flex: 6, // takes 2/3 of the screen
        paddingTop: 200,
        justifyContent: 'center'
    },

    lowerContainer: {
        flex: 4, // takes 1/3 of the screen
        justifyContent: 'flex-end', // align content to the bottom
        paddingTop: 400,
        paddingBottom: 200, // add some padding to create space between the buttons and the bottom
    },
    card_template: {
        width: 350,
        height: 200,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        // alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically

    },

    section_title: {
        marginTop: 20,
        fontWeight: 'bold'
    },

    section_text: {
        marginBottom: 20,
    },

    button: {
        paddingVertical: 15, // Increase vertical padding to make the button taller
        paddingHorizontal: 25, // Increase horizontal padding to make the button wider
        padding: 8,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF4F3',
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,

    },
});

export default period;