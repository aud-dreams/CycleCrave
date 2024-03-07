import React, { useState, useEffect } from "react";
import { onValue, get, update, child, ref } from "firebase/database";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { getRecommendFoods } from "../recommendations/nutritionRecc";
import { auth, db } from "../firebaseConfig";

type FoodRecommendation = {
    foodName: string;
    benefits: string;
    image: string;
};


const Nutrition: React.FC = () => {
    // const recommendations = useRecommendFoods();
    // console.log(recommendations);

    // get reccomendations from user
    const [recommendations, setRecommendations] = useState([]);
    const user = auth.currentUser;

    if (user) {
        const uid = user.uid;

        const userRef = ref(db, `users/${uid}`);

        // Fetch the most recent cravings
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setRecommendations(data);
            }
        });
    }

    console.log(recommendations);

    const NewCard: React.FC<FoodRecommendation> = ({
        foodName,
        benefits,
        image,
    }) => {
        return (
            <View style={[styles.card_template]}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: image }}
                />
                <Text style={styles.section_title}>{foodName}</Text>
                <Text style={styles.section_title}>{benefits}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}> Nutrition </Text>

            <ScrollView
                contentContainerStyle={styles.cardContainer}
                style={styles.scrollView}
            >
                {recommendations.map((recc, i) => (
                    <NewCard
                        key={i}
                        foodName={recc.foodName}
                        benefits={recc.benefits}
                        image={recc.image}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start", // Center items vertically
        alignItems: "center", // Center items horizontally
        backgroundColor: "#FFF4F3",
        padding: 10,
    },
    header: {
        fontWeight: "bold",
        marginVertical: 20,
        fontSize: 35,
        fontFamily: "Cormorant_700Bold",
        marginTop: 50,
    },
    cardContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card_template: {
        width: 350,
        height: 300,
        backgroundColor: "#D5ECD5",
        borderRadius: 10,
        justifyContent: "center", // Center content vertically
        marginBottom: 30,
        borderWidth: 1,
        borderColor: "#d3d3d3",
        // box shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    photo_template: {
        width: 300,
        height: 100,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        justifyContent: "center", // Center content vertically
        marginBottom: 10,
    },
    section_title: {
        fontWeight: "bold",
        paddingLeft: 15,
        fontSize: 20,
    },
    scrollView: {
        maxHeight: 700, // Adjust the maximum height as needed
    },
    section_text: {
        marginBottom: 20,
    },
    image: {},
});

export default Nutrition;
