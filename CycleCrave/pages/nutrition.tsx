import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const nutrition = () => {

    const NewCard = ({ title }) => {
        return (
            <View
                style={[styles.card_template]}
            >
                <Text>{title}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}> Hydration </Text>

            <ScrollView contentContainerStyle={styles.cardContainer} style={styles.scrollView}>
                {/* Map through an array of titles to create a button for each */}
                {['Mood Swings', 'Headache', 'Period Cramps', 'PMS', 'Bloating', 'Constipation'].map((title) => (
                    <NewCard
                        key={title} // Use a unique key for each button
                        title={title}
                    />
                ))}
            </ScrollView>
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

    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    cardContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    card_template: {
        width: 350,
        height: 200,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        justifyContent: 'center', // Center content vertically
        marginBottom: 10,
    },

    section_title: {
        marginTop: 20,
        fontWeight: 'bold'
    },

    scrollView: {
        maxHeight: 400, // Adjust the maximum height as needed
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

export default nutrition;