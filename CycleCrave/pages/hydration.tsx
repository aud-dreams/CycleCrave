import { child, get, onValue, push, ref, set, update } from "firebase/database";
import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

import CircularProgress from "react-native-circular-progress-indicator";
import { auth, db } from "../firebaseConfig";
import { calculateHydrationScore } from "../recommendations/waterRecc";

const pushHydrationToDatabase = (uid, date, hydrationAmount, goalMet) => {
  const hydrationRef = ref(db, `hydration/${uid}/${date}`);

  const data = {
    amount: hydrationAmount,
    goalMet: goalMet,
  };

  set(hydrationRef, data)
    .then(() => {
      console.log("Hydration data updated successfully");
    })
    .catch((error) => {
      console.error("Error updating hydration data:", error);
    });
};

const Hydration = () => {
  const [progressValue, setProgressValue] = useState(0);
  const [goal, setGoal] = useState(1);

  useEffect(() => {
    const hydrationGoalRef = ref(
      db,
      `users/${auth.currentUser.uid}/hydrationGoal`
    );

    const currentDate = new Date().toISOString().split("T")[0];
    const hydrationAmountRef = ref(
      db,
      `hydration/${auth.currentUser.uid}/${currentDate}/amount`
    );

    const goalUnsubscribe = onValue(hydrationGoalRef, (snapshot) => {
      const goalValue = snapshot.val();

      if (goalValue !== null) {
        setGoal(goalValue);
      } else {
        console.log("Hydration goal not found for the user!");
      }
    });

    const amountUnsubscribe = onValue(hydrationAmountRef, (snapshot) => {
      const amountValue = snapshot.val();
      if (amountValue !== null) {
        // Handle hydration amount value
        setProgressValue(amountValue);
        console.log("Hydration amount for the day:", amountValue);
      } else {
        console.log("Hydration amount not found for the day!");
      }
    });

    return () => {
      goalUnsubscribe();
      amountUnsubscribe();
    };
  }, []);

  const incrementProgressBar = (amount) => {
    if (amount < goal) {
      setProgressValue((prev) => {
        const newValue = Math.min(prev + amount, goal);
        const currentDate = new Date().toISOString().split("T")[0];
        showAlert(prev, amount, goal);
        console.log("hi queen 🗣️  " + amount);

        pushHydrationToDatabase(
          auth.currentUser.uid,
          currentDate,
          newValue, // Pass the updated value of progressValue
          newValue >= goal // Check against the updated value of progressValue
        );

        // calculate hydration score & update db
        const fetchHydrationScore = async () => {
          const score = await calculateHydrationScore(auth.currentUser.uid);
          update(ref(db, `users/${auth.currentUser.uid}`), {
            hydrationScore: score,
          });
        };
        return newValue; // Return the updated value
      });
    }
  };

  const showAlert = (prev, amount, goal) => {
    try {
      if (prev + amount < goal) {
        Alert.alert(
          "Woo ✨",
          "Drink " +
            (goal - (prev + amount)) +
            " more ounces to reach your daily hydration goal!",
          [
            {
              text: "Ok",
              style: "default",
            },
          ],
          {
            cancelable: true,
          }
        );
      } else {
        Alert.alert(
          "Congrats 🎉",
          "You've reached your daily hydration goal!",
          [
            {
              text: "Ok",
              style: "default",
            },
          ],
          {
            cancelable: true,
          }
        );
      }
    } catch (error) {
      console.error("Error showing alert:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { textAlign: "center" }]}>Hydration</Text>
      <View style={styles.upperContainer}>
        <CircularProgress
          value={(progressValue / goal) * 100}
          radius={120}
          duration={500}
          progressValueColor={"black"}
          maxValue={100}
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
            <View style={styles.buttonContent}>
              <FontAwesome6 name="droplet" size={24} color="black" />
              <Text style={styles.buttonText}>8 oz</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.mediumBlue]}
            onPress={() => incrementProgressBar(16)}
          >
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons name="cup" size={24} color="black" />
              <Text style={styles.buttonText}>16 oz</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.darkBlue]}
            onPress={() => incrementProgressBar(32)}
          >
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons
                name="glass-mug"
                size={24}
                color="black"
              />
              <Text style={styles.buttonText}>32 oz</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.darkestBlue]}
            onPress={() => incrementProgressBar(64)}
          >
            <View style={styles.buttonContent}>
              <FontAwesome6 name="bottle-water" size={24} color="black" />
              <Text style={styles.buttonText}>64 oz</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF4F3",
    padding: 10,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
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
    paddingVertical: 18,
    paddingHorizontal: 30,
    width: 150,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#FEDBD5",
    flex: 1,
    margin: 15,
    // box shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  upperContainer: {
    flex: 6, // takes 2/3 of the screen
    justifyContent: "flex-end",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 1,
  },
  lowerContainer: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    flex: 6, // takes 1/3 of the screen
    justifyContent: "center", // align content to the bottom
    paddingBottom: 150, // add some padding to create space between the buttons and the bottom
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
    fontSize: 19,
    color: "black",
    marginLeft: 10,
  },
});

export default Hydration;
