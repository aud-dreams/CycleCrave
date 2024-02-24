import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const Nutrition = () => {
  const NewCard = ({ title }) => {
    return (
      <View style={[styles.card_template]}>
        <Text style={styles.section_title}>{title}</Text>
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
        {/* Map through an array of titles to create a button for each */}
        {[
          "Whole Grains",
          "Leafy Greens",
          "Nuts and Seeds",
          "Lean Proteins",
          "Colorful Vegetables",
          "Fruits",
        ].map((title) => (
          <NewCard
            key={title} // Use a unique key for each button
            title={title}
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
});

export default Nutrition;
