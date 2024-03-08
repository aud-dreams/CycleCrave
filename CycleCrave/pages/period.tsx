import { onValue, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../firebaseConfig";
import { getRecommendFoods } from "../recommendations/nutritionRecc";
import { scoreSymptoms } from "../recommendations/scoreSymptoms";

const Period = () => {
  const [cravings, setCravings] = useState({
    Crunchy: false,
    Fruity: false,
    Salty: false,
    Sweet: false,
    Spicy: false,
  });

  const [symptoms, setSymptoms] = useState({
    Bloating: false,
    Constipation: false,
    Headache: false,
    "Mood Swings": false,
    PMS: false,
    "Period Cramps": false,
  });

  // Function to fetch most recent cravings and symptoms from the database
  const fetchRecentData = () => {
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;

      // Reference to the most recent entry in the 'cravings' node
      const cravingsRef = ref(db, `cravings/${uid}`);
      // Reference to the most recent entry in the 'symptoms' node
      const symptomsRef = ref(db, `symptoms/${uid}`);

      // Fetch the most recent cravings
      onValue(cravingsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Get the most recent timestamp
          const mostRecentTimestamp = Object.keys(data).reduce(
            (prev, curr) => (parseInt(curr) > parseInt(prev) ? curr : prev),
            "0"
          );
          // Update cravings state with the most recent data from the database
          setCravings(data[mostRecentTimestamp]);
        }
      });

      // Fetch the most recent symptoms
      onValue(symptomsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Get the most recent timestamp
          const mostRecentTimestamp = Object.keys(data).reduce(
            (prev, curr) => (parseInt(curr) > parseInt(prev) ? curr : prev),
            "0"
          );
          // Update symptoms state with the most recent data from the database
          setSymptoms(data[mostRecentTimestamp]);
        }
      });
    }
  };

  // Call the fetchRecentData function when the component mounts
  useEffect(() => {
    fetchRecentData();
  }, []);

  const handlePress = (category: string, title: string) => {
    return () => {
      if (category == "cravings")
        setCravings((prevState) => ({
          ...prevState,
          [title]: !prevState[title],
        }));
      else if (category == "symptoms")
        setSymptoms((prevState) => ({
          ...prevState,
          [title]: !prevState[title],
        }));
    };
  };

  const NewButton = ({ title, buttonPressed, handlePress }) => {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          buttonPressed ? styles.buttonPressed : styles.defaultButton,
        ]}
        onPress={handlePress(title)}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };

  const saveDataToDatabase = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const timestamp = new Date().getTime();

      try {
        // Save symptoms data to database
        set(ref(db, `symptoms/${uid}/${timestamp}`), symptoms);
        // Save cravings data to database
        set(ref(db, `cravings/${uid}/${timestamp}`), cravings);

        const recommendations = await getRecommendFoods();

        // update reccomendations list for user
        update(ref(db, `users/${user.uid}`), {
          nutritionplans: recommendations,
        });

        const symptomScore = await scoreSymptoms();
        update(ref(db, `users/${user.uid}`), {
          symptomScore: symptomScore,
        });
      } catch (error) {
        console.error("Error saving data to database:", error);
      }
    } else {
      console.error("User not authenticated");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Period </Text>

      <View>
        <Text style={styles.section_title}>Symptoms</Text>
        <Text style={styles.section_text}>Select all that apply</Text>
        <View style={styles.card_template1}>
          <View style={styles.buttonContainer}>
            {/* Map through an array of titles to create a button for each */}
            {Object.keys(symptoms).map((title) => (
              <NewButton
                key={title} // Use a unique key for each button
                title={title}
                buttonPressed={!!symptoms[title]}
                handlePress={() => handlePress("symptoms", title)}
              />
            ))}
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.section_title}>Cravings</Text>
        <Text style={styles.section_text}>Select all that apply</Text>
        <View style={styles.card_template2}>
          <View style={styles.buttonContainer}>
            {/* Map through an array of titles to create a button for each */}
            {Object.keys(cravings).map((title) => (
              <NewButton
                key={title} // Use a unique key for each button
                title={title}
                buttonPressed={!!cravings[title]}
                handlePress={() => handlePress("cravings", title)}
              />
            ))}
          </View>
        </View>
        <View style={styles.bottomButton}>
          <NewButton
            key={"Save"} // Use a unique key for each button
            buttonPressed={false}
            title={"Save"}
            handlePress={() => saveDataToDatabase}
          />
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
  allButtons: {
    alignItems: "center",
  },
  bottomButton: {
    width: 350,
    padding: 0,
    margin: 0,
  },
  buttonContainer: {
    flexDirection: "row", // Allow button to expand horizontally
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  buttonPressed: {
    backgroundColor: "#FF898D", // Change to darker color when pressed
  },
  defaultButton: {
    backgroundColor: "#FEDBD5", // default button
  },
  header: {
    fontWeight: "bold",
    marginVertical: 20,
    fontSize: 35,
    fontFamily: "Cormorant_700Bold",
    marginTop: 50,
  },
  upperContainer: {
    flex: 6, // takes 2/3 of the screen
    paddingTop: 100,
    justifyContent: "center",
  },
  lowerContainer: {
    flex: 4, // takes 1/3 of the screen
    justifyContent: "flex-end", // align content to the bottom
    paddingTop: 400,
    paddingBottom: 200, // add some padding to create space between the buttons and the bottom
  },
  card_template1: {
    width: 350,
    height: 215,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "center", // Center content vertically
    borderWidth: 1,
    borderColor: "#d3d3d3",
    paddingTop: 8,
    // box shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 30,
  },
  card_template2: {
    width: 350,
    height: 150,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "center", // Center content vertically
    borderWidth: 1,
    borderColor: "#d3d3d3",
    paddingTop: 8,
    // box shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 30,
  },
  section_title: {
    fontWeight: "bold",
    fontFamily: "Cormorant_700Bold",
    fontSize: 25,
  },
  section_text: {
    marginTop: 10,
    marginBottom: 8,
  },
  button: {
    paddingVertical: 15, // Increase vertical padding to make the button taller
    paddingHorizontal: 25, // Increase horizontal padding to make the button wider
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFF4F3",
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    // box shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});

export default Period;
