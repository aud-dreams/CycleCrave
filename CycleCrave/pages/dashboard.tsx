import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../firebaseConfig";
import { ref, update, onValue } from "firebase/database";
import { calculateSleepScore } from "../recommendations/sleepRecc";

const Dashboard = () => {
  // set useStates for hearts
  const [symptomScore, setSymptomScore] = useState(0);
  const [sleepScore, setSleepScore] = useState(0);
  const [hydrationScore, setHydrationScore] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    const uid = user.uid;
    const userRef = ref(db, `users/${uid}`);

    const userUnsubscribe = onValue(userRef, (snapshot) => {
      const userValue = snapshot.val();
      if (userValue !== null) {
        setSymptomScore(userValue.symptomScore);
        setHydrationScore(userValue.hydrationScore);
        setSleepScore(userValue.sleepScore);
      }
    });
    return () => {
      userUnsubscribe();
    };
  }, []);

  // run calculateSleepScore once on app load
  useEffect(() => {
    const fetchSleepScore = async () => {
      const score = await calculateSleepScore(auth.currentUser.uid);
      setSleepScore(score);
    };
    fetchSleepScore();
  }, []);

  const renderHearts = (count) => {
    let hearts = [];
    for (let i = 0; i < count; i++) {
      hearts.push(
        <Icon
          key={i}
          name="heart"
          size={25}
          color="#FF898D"
          style={styles.heartIcon}
        />
      );
    }
    return hearts;
  };

  // set useStates for calendar
  const [selected, setSelected] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi {auth.currentUser.displayName}</Text>

      <ScrollView
        contentContainerStyle={styles.sleepContainer}
        style={styles.scrollView}
      >
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            theme={{
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
              todayTextColor: "#FF898D",
              arrowColor: "#FF898D",
              monthTextColor: "#FF898D",
            }}
            // example sequence of dates
            markedDates={{
              "2024-03-06": {
                startingDay: true,
                selected: true,
                color: "#FF898D",
                textColor: "white",
              },
              "2024-03-07": {
                selected: true,
                color: "#FF898D",
                textColor: "white",
              },
              "2024-03-08": {
                selected: true,
                color: "#FF898D",
                textColor: "white",
              },
              "2024-03-09": {
                selected: true,
                endingDay: true,
                color: "#FF898D",
                textColor: "white",
              },
            }}
            markingType={"period"}
          />
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryTitle}>SYMPTOMS</Text>
          <View style={styles.heartsContainer}>
            {renderHearts(symptomScore)}
          </View>
        </View>
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>WATER</Text>
          <View style={styles.heartsContainer}>
            {renderHearts(hydrationScore)}
          </View>
        </View>
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>SLEEP</Text>
          <View style={styles.heartsContainer}>{renderHearts(sleepScore)}</View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: "#FFF4F3",
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    width: 350,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#ffe4e1",
  },
  greeting: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginVertical: 20,
    fontSize: 35,
    fontFamily: "Cormorant_700Bold",
    paddingLeft: 30,
    marginTop: 50,
  },
  category: {
    // width: 350,
    width: 340,
    alignItems: "center",
    marginVertical: 15,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#ffe4e1",
    // box shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  categoryTitle: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  heartsContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginTop: 10,
    paddingLeft: 10,
  },
  heartIcon: {
    marginHorizontal: 2,
  },
  sleepContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  scrollView: {
    // maxHeight: 650,
    maxHeight: 700,
  },
});

export default Dashboard;
