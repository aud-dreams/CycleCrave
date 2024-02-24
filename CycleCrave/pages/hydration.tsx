import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
// import { Button } from 'react-native-paper';

import CircularProgress from "react-native-circular-progress-indicator";

const Hydration = () => {
  const [progressValue, setProgressValue] = useState(0);

  // hardcoded goal !!
  const goal = 100;

  const incrementProgressBar = (amount) => {
    // ensure progressValue doesn't exceed maxValue of 100
    const newProgressValue = Math.min(progressValue + amount, 100);
    setProgressValue(newProgressValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hydration</Text>
      <View style={styles.upperContainer}>
        <CircularProgress
          value={(progressValue / goal) * 100}
          radius={120}
          duration={500}
          progressValueColor={"black"}
          maxValue={goal}
          title={`oz`}
          titleColor={"black"}
          activeStrokeColor={"#BBE0FF"}
          inActiveStrokeColor={"#D9D9D9"}
          activeStrokeWidth={20}
          inActiveStrokeWidth={20}
        />
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.lightBlue]}
            onPress={() => incrementProgressBar(8)}
          >
            <Text style={styles.buttonText}>8 oz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.mediumBlue]}
            onPress={() => incrementProgressBar(16)}
          >
            <Text style={styles.buttonText}>16 oz</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.darkBlue]}
            onPress={() => incrementProgressBar(32)}
          >
            <Text style={styles.buttonText}>32 oz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.darkestBlue]}
            onPress={() => incrementProgressBar(64)}
          >
            <Text style={styles.buttonText}>64 oz</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  buttonRow: {
    flexDirection: "row", // Arrange buttons horizontally
  },
  header: {
    fontWeight: "bold",
    marginVertical: 20,
    fontSize: 35,
    fontFamily: "Cormorant_700Bold",
    marginTop: 50,
  },
  button: {
    paddingVertical: 15, // Increase vertical padding to make the button taller
    paddingHorizontal: 30, // Increase horizontal padding to make the button wider
    width: 150,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#FEDBD5",
    flex: 1,
    margin: 8,
    // box shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  upperContainer: {
    flex: 6, // takes 2/3 of the screen
    justifyContent: "flex-end",
    paddingTop: 30,
  },
  lowerContainer: {
    flex: 4, // takes 1/3 of the screen
    justifyContent: "flex-end", // align content to the bottom
    paddingBottom: 250, // add some padding to create space between the buttons and the bottom
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
  buttonText: {
    fontSize: 16,
  },
});

export default Hydration;
